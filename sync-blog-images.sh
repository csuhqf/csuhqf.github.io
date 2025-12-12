#!/bin/bash

# ========================================
# 博客图片自动同步脚本
# 功能：将 posts/ 下的所有 imgX 目录同步到 public/images/blog/
# ========================================

POSTS_DIR="posts"
PUBLIC_DIR="public/images/blog"

echo "🔄 开始同步博客图片..."

# 确保目标目录存在
mkdir -p "$PUBLIC_DIR"

# 查找 posts 目录下所有的 imgX 目录
synced_count=0
for img_dir in "$POSTS_DIR"/img*/; do
    if [ -d "$img_dir" ]; then
        dir_name=$(basename "$img_dir")
        echo "  📁 同步 $dir_name ..."
        
        # 使用 rsync 同步（保持更新，删除目标中多余的文件）
        rsync -av --delete "$img_dir" "$PUBLIC_DIR/" > /dev/null 2>&1
        
        ((synced_count++))
    fi
done

if [ $synced_count -eq 0 ]; then
    echo "  ℹ️  未找到需要同步的图片目录"
else
    echo "✅ 完成！已同步 $synced_count 个图片目录"
fi

echo ""
echo "💡 提示：图片已同步到 $PUBLIC_DIR/"
echo "   现在可以在 Markdown 中使用 ./imgX/ 引用图片了"
