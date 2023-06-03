# Wallpaper Engine downloader

![Wallpaper-Engine-downloader](https://socialify.git.ci/zuo-shi-yun/Wallpaper-Engine-downloader/image?description=1&font=Bitter&logo=https%3A%2F%2Fi.postimg.cc%2Fxd1c0GWx%2Fimage.png&name=1&owner=1&theme=Light)

### :clap:使用方法

- 进入bin目录，点击downloader.exe运行程序
- 首次使用需提供待转换图片路径以及图片转换成功后的保存路径，中间用空格分隔
- 之后每次使用只需要提供待转换图片路径即可

### :muscle:功能介绍

##### 将壁纸引擎中的图片转为png/jpg类型的图片

- 只需提供待转换图片路径即可完成转换

##### 支持多/单张转换

- 系统自动检测待转换图片路径下是否包含多张壁纸，若包含多张壁纸将一并转换，反之只转换一张
- 单张转换时应提供待转换壁纸的绝对路径，如:`xxx\xx\431960\壁纸id`，可通过在壁纸引擎中“已安装”栏下，右键待转换壁纸，点击“在资源管理器中打开”找到路径
- 多张转换时应提供壁纸的上级目录的绝对路径，一般为`431960`文件夹所在路径，可过在壁纸引擎中“已安装”栏下，右键任一壁纸，点击“在资源管理器中打开”，返回上一级目录，找到路径
- 若路径下某张壁纸不是“场景”类型，系统将不进行转换，故多张转换时无需担心系统出错

##### 下载路径可修改

- 只需在首次启动时提供图片转换成功后的保存路径，之后便无需再次提供
- 保存路径可以在bin/downloadPath.txt中修改