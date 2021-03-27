import pandas as pd
import os
import shutil
from img_compression import ImageEditor

class AutoAdd:

    def __init__(self):
        pass

    def read_data(self, path):
        self.df = pd.read_csv(path, engine='python',  encoding = "ISO-8859-1")
        print ('df read ', self.df.shape)
        # print (self.df.head())
        return self.df

    def make_html_files(self):
        pass

    def get_file_onelevel(self, folder ='', filetype = '.jpg'):
        file_list = []
        for root, dirs, files in os.walk(folder):
            # print (' check the dirs ', root, dirs, files)
            file_list = files
            break
        return file_list

    def get_file_bytype(self, folder='', filetype = '.jpg', rootfolder_only = True):
        file_list = []
        for root, dirs, files in os.walk(folder):
            # print (' check the dirs ', root, dirs, files)
            for file in files:
                if file.endswith(filetype):
                    file_list.append(file)

            if(rootfolder_only): # do only a single folder
                break
        return file_list

    def get_directories(self, parent_dir = ''):
        # folders = [x[0] for x in os.walk(parent_dir)]
        folders = next(os.walk(parent_dir))[1]
        # print (' folders area ', folders[1:])
        return folders


    def copy_paste_folder(self, folder = '', new_folder = ''):
        shutil.copytree(folder, new_folder)
        return

    def calc_num_images_perfolder(self, parent_dir = '', folders = []):
        im = ImageEditor()
        proj_folder = './projects/'

        len_images_dict = {}
        for folder in folders:
            # folder = proj_folder + folder
            file_list = self.get_file_bytype(proj_folder + folder, filetype='.jpg')
            print (' for folder ', folder, len(file_list) , '++++++++++++++++++++++++++++++ \n')

            foldername = folder.split('\\')[-1]
            len_images_dict[foldername] = len(file_list)

            # other tasks
            newpath = './../../../00_BKPROJS/'
            path = proj_folder + foldername + '/'
            
            if not os.path.exists(newpath + foldername):
                print (' inside extra stuff ', newpath + foldername)
                # copy high res folder
                self.copy_paste_folder(proj_folder + foldername, newpath + foldername)
                print (' copied folder succesfully ', foldername)
            
                # compress the high res folder
                im.oper_single_folder(path)
                print (' compressed images succesfully')

            

        print (' len img dict ', len_images_dict)
        return  len_images_dict

    def populate_df_numimg(self, len_images_dict = {},  df = None):
        # if(df == None): df = self.df
        def get_num_img(row):
            return len_images_dict[row['proj_folder']]
        df['proj_num_images'] = df.apply(lambda x : get_num_img(x), axis = 1)
        print ('AFTER POPULATE NUM IMAGES \n ', df)
        return df


    def copy_rename_html_files(self, df, folder = './../../projects/'):        

        files = self.get_file_onelevel(folder, '.html')
        print (' files ', files)

        new_filenames = df['proj_folder'].values.tolist()
        extension = '.html'
        for newfile in new_filenames:
            new_name = os.path.join(folder, newfile + extension)
            if not os.path.exists(new_name):
                shutil.copy(folder + files[0], new_name)
                print (' copied ', new_name)

    def write_csv(self, df, path = ''):
        if(df is None): return
        df.to_csv(path, index =None)
        print (' WRITTEN SUCCESFULLY !')

if __name__ == "__main__":
    atm = AutoAdd()
    path = './projects_directory.csv'
    df = atm.read_data(path)
    # shuffle
    df = df.sample(frac=1).reset_index(drop=True)

    folders = atm.get_directories('./projects')
    len_images_dict = atm.calc_num_images_perfolder('./projects', folders)
    df_new = atm.populate_df_numimg(len_images_dict, df)

    atm.copy_rename_html_files(df_new)

    atm.write_csv(df_new, path)