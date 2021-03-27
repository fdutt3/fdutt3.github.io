

from PIL import Image
import PIL
import os
import glob
import shutil


class ImageEditor:

    def __init__(self):
        pass

    def get_file_bytype(self, folder='', filetype = '.jpg'):
        file_list = []
        for root, dirs, files in os.walk(folder):
            # print (' check the dirs ', root, dirs, files)
            for file in files:
                if file.endswith(filetype):
                    file_list.append(file)
            # do only a single folder
            break
        return file_list


    def get_folders(self, folder = ''):
        # folderlist = [x[0] for x in os.walk(folder)]
        foldernamelist = next(os.walk(folder))[1]
        return foldernamelist

    def process_folder(self, folder = '', file_list = []):

        first = True
        for index,filename in enumerate(file_list):
            if(first):
                newfilename = 'b_' + filename

                picture = Image.open(folder + filename)
                wid = picture.size[0]
                ht = picture.size[1]
                picture_new = picture.resize((int(wid*0.5), int(ht*0.5)))
                picture_new.save(folder + newfilename, optimize=True,quality=60)

                # shutil.copy(folder + filename, folder + newfilename)
                # self.img_compress(folder, newfilename, min_filesize = False, thresh_filesize = 300, quality = 20 )
                first = False

            self.img_compress(folder,filename, quality = 60 )

        

    def extra_dir_util(self, path = '', foldername = 'processed'):
        if not os.path.exists(path + foldername):
            os.makedirs(path + foldername)
        else:
            # os.rmdir(path + 'processed')
            shutil.rmtree(path + foldername)
            os.makedirs(path + foldername)


    def img_compress(self, path = '', filename = '', min_filesize = True, thresh_filesize = 300, quality = 30):
        filesize = os.path.getsize(path + filename)/1024
        if(min_filesize and filesize < thresh_filesize): 
            print (' not compressing image size - ', path, filesize)
            return
        picture = Image.open(path + filename)
        # newpath = path + 'processed/' + '_' + filename
        newpath = path + filename
        # dim = picture.size
        # print(f"This is the current width and height of the image: {dim} /// {filesize}")
        picture.save(newpath,optimize=True,quality=quality)
        return

    def oper_single_folder(self, path):
        # im.extra_dir_util(path)
        file_list = self.get_file_bytype(path, filetype='.jpg')
        # print (' filelist gotten ', file_list)
        self.process_folder(path, file_list)


    def process_multi_folders(self, proj_folder = '', foldernamelist = []):

        for index, foldername in enumerate(foldernamelist):
            print ('starting folder ', index, foldername, '+++++++++++++++++++++++++++++++++++++++++++ \n')
            path = proj_folder + foldername + '/'

            self.oper_single_folder(path)

        return


if __name__ == "__main__":
    im = ImageEditor()
    proj_folder = './projects/'
    path = proj_folder + 'pods-public-seating/'

    foldernamelist = im.get_folders(proj_folder)
    print (' foldername list ', foldernamelist, len(foldernamelist))
   
    # ALL PROJS FOLDERS
    im.process_multi_folders(proj_folder, foldernamelist)

    exit()

    # SINGLE FOLDER WORKFLOW
    im.oper_single_folder(path)
