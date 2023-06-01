import ctypes
import os
import shutil
import subprocess
import sys


def judgeFileType(path):
    """
        若指定path路径下均是文件夹(整体转换)则返回1,否则返回2(只转换一张)
    """
    file_list = os.listdir(path)

    for file_name in file_list:
        file_path = os.path.join(path, file_name)
        if not os.path.isdir(file_path):
            return 2
    else:
        return 1


def judgeType(content):
    """
        返回值为dir类型,download_path(str)代表图片下载路径,image_path(list[str])是图片路径列表
    """
    path = list(content.split())
    download_path = ''

    if len(path) == 1:
        # 读取下载目录
        with open('downloadPath.txt', 'r') as f:
            download_path = f.read()
    else:
        with open('downloadPath.txt', 'w') as f:
            f.write(path[1])
            download_path = path[1]

    image_path = []
    # 判断操作类型
    if judgeFileType(path[0]) == 1:
        # 整体转换
        file_list = os.listdir(path[0])
        for file_name in file_list:
            file_path = os.path.join(path[0], file_name)
            image_path.append(file_path)
    else:
        # 只转换一张
        image_path.append(path[0])

    return download_path, image_path


def deleteFile(directory):
    """
        删除directory目录下的全部文件
    """
    for dir_path, dir_names, file_names in os.walk(directory):
        for file_name in file_names:
            file_path = os.path.join(dir_path, file_name)
            os.remove(file_path)
        for dir_name in dir_names:
            shutil.rmtree(os.path.join(dir_path, dir_name))


def main():
    # 根据是否有downloadPath.txt文件输出不同的内容
    if os.path.exists("downloadPath.txt"):
        print('输入要转换的文件夹路径:')
    else:
        print('输入要转换的文件夹路径以及图片下载路径,中间用空格分隔:')

    text = input().replace('\\', '/')
    # 得到图片下载路径以及图片源文件路径
    download_path, image_path = judgeType(text)
    dst_path = '../RePKG/bin/Debug/net472'

    # 转换.pkg文件,只支持转换有scene.pkg的壁纸,即类型为"场景"的壁纸
    for i in image_path:
        # 删除上一次生成的文件
        deleteFile(os.path.join(dst_path, 'output/materials'))
        if os.path.exists(os.path.join(i, 'scene.pkg')):
            # 移动.pkg文件到工作区
            shutil.copy(os.path.join(i, 'scene.pkg'), os.path.join(dst_path, 'scene.pkg'))

            # 获得脚本路径,以便后续调用命令行
            script_dir = os.path.dirname(os.path.dirname(sys.executable))
            print(script_dir)
            file_path1 = os.path.join(script_dir, "RePKG/bin/Debug/net472/RePKG.exe")
            file_path2 = os.path.join(script_dir, "RePKG/bin/Debug/net472/scene.pkg")
            # 调用命令行运行exe文件
            os.system('cd /d' + os.path.join(script_dir,
                                             "RePKG/bin/Debug/net472") + ' & ' + file_path1 + ' extract ' + file_path2)

        # 将生成的图片移动到指定目录
        for filename in os.listdir(os.path.join(dst_path, 'output/materials')):
            # 找到图片文件
            if filename.endswith(('.png', '.jpg')):
                # 确定源文件路径
                file_path = os.path.join(os.path.join(dst_path, 'output/materials'), filename)
                # 移动
                shutil.move(file_path, os.path.join(download_path, filename))
                break


if __name__ == '__main__':
    main()
    print('完成')
    os.system('pause')
