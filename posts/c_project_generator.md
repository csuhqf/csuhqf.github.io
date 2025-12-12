# 极简C++工程脚手架：一键生成CMake + Neovim LSP环境（Mac/Linux and Windows）

- [引言](#引言)
- [核心痛点与解决](#核心痛点与解决)
- [脚本实现](#脚本实现)
- [使用演示](#使用演示)
- [尾注](#尾注)

## 前言
**目的**：最近在进行InSAR算法的底层优化，技术栈从纯Python扩展到了C++。在学习和开发过程中，每次新建一个测试项目，都需要重新编写 `CMakeLists.txt`，创建目录结构，最麻烦的是<mark>***每次都要手动配置 `compile_commands.json` 才能让 Neovim 的 LSP (Clangd) 正常工作***</mark>。为了提高效率，拒绝重复造轮子，我编写了一个自动化脚本来解决这套流程。

## 核心痛点与解决
在 Mac 终端环境下开发 C++，通常会遇到以下几个繁琐的步骤：
1.  手动 `mkdir src include build`。
2.  手写 `CMakeLists.txt`，容易写错语法。
3.  **LSP配置问题**：默认生成的项目，Neovim 无法识别头文件路径，必须手动执行 `cmake -DCMAKE_EXPORT_COMPILE_COMMANDS=1` 并建立软链接。

本文提供的脚本实现了 **“一行命令，环境就绪”**。

## 脚本实现

**第一步**：编写 Shell 脚本。我将其命名为 `creat_c_project.sh`。这个脚本会自动完成目录创建、CMake配置生成以及 LSP 软链接的建立。

```bash
#!/bin/bash

# =======================================================
# 极简 C++ 项目结构生成脚本
# 功能：目录生成 + 现代CMake配置 + 自动适配Neovim LSP
# =======================================================

if [ -z "$1" ]; then
    echo "使用方法: $0 <ProjectName>"
    exit 1
fi

PROJECT_NAME=$1
PROJECT_DIR="./$PROJECT_NAME"

if [ -d "$PROJECT_DIR" ]; then
    echo "错误: 目录 $PROJECT_DIR 已存在。"
    exit 1
fi

echo "🚀 正在创建 C++ 项目: $PROJECT_NAME"

# 1. 创建标准目录结构
mkdir -p "$PROJECT_DIR/src"
mkdir -p "$PROJECT_DIR/include"
mkdir -p "$PROJECT_DIR/build"
mkdir -p "$PROJECT_DIR/data"

# 2. 生成 .clang-format (统一代码风格)
echo -e '---
BasedOnStyle: LLVM
IndentWidth: 4
...
' > "$PROJECT_DIR/.clang-format"

# 3. 生成 CMakeLists.txt (关键配置)
cat << EOF > "$PROJECT_DIR/CMakeLists.txt"
cmake_minimum_required(VERSION 3.10)
project(${PROJECT_NAME} LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED True)
set(CMAKE_EXPORT_COMPILE_COMMANDS ON) # 生成 compile_commands.json

# 自动扫描 src 下的所有 cpp 文件
file(GLOB_RECURSE SOURCE_FILES CONFIGURE_DEPENDS "src/*.cpp")

add_executable(${PROJECT_NAME} \${SOURCE_FILES})
target_include_directories(${PROJECT_NAME} PUBLIC \${CMAKE_SOURCE_DIR}/include)
EOF

# 4. 生成 main.cpp
cat << EOF > "$PROJECT_DIR/src/main.cpp"
#include <iostream>

int main() {
    std::cout << "Starting ${PROJECT_NAME}..." << std::endl;
    return 0;
}
EOF

# 5. 自动初始化构建并链接 LSP 配置
echo "⚙️  正在初始化 CMake 环境..."
cd "$PROJECT_DIR/build"
cmake .. > /dev/null 2>&1
cd ..

# 建立软链接，让 clangd 能找到配置
if [ -f "build/compile_commands.json" ]; then
    ln -sf build/compile_commands.json compile_commands.json
    echo "  [LSP 就绪: compile_commands.json 已链接]"
fi

echo "✅ 项目 $PROJECT_NAME 已就绪！"
```

**第二步**：赋予脚本执行权限。建议将脚本放在环境变量路径下（如 `~/bin` 或自定义的工具目录），并在 `.zshrc` 中配置好 PATH。

```shell
chmod +x creat_c_project.sh
```

## 使用演示

**第三步**：在终端直接运行脚本。例如创建一个名为 `InSAR_Test` 的项目。

```shell
./creat_c_project.sh InSAR_Test
```

![Terminal](./img4/one.jpg)

**第四步**：效果验证。脚本运行后，目录结构如下所示，且 `compile_commands.json` 已自动链接到根目录。使用 `nvim src/main.cpp` 打开文件，***代码补全和跳转功能即刻生效，无需任何额外配置***。

```text
InSAR_Test/
├── CMakeLists.txt
├── build/
├── compile_commands.json -> build/compile_commands.json  <-- 关键！
├── include/
└── src/
    └── main.cpp
```
![Neovim LSP](./img4/two.jpg)

## 尾注
- 本文脚本适用于 Mac (M芯片/Intel) 及 Linux 环境。Windows 用户建议使用我编写的 Python 版本（自动处理路径分隔符和软链接权限）。
- 脚本中使用了 `GLOB_RECURSE` 来管理源文件，适合中小型科研项目或算法验证，大型工程建议显式列出源文件。
- 本文工具已上传至 GitHub，包含 Shell 和 Python 两个版本，欢迎 Star 和改进：[C-Project-Generator](https://github.com/csuhqf/C-Project-Generator)。
- 同时感谢 [CMake 官方文档](https://cmake.org/documentation/) 对配置语法的参考。