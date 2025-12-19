---
title: "自己写的库：rstiff：高精度、类型保留的 Rust GeoTiff 处理库"
date: "2025-12-19"
excerpt: "一个基于 GDAL 的高精度、类型保留的 Rust GeoTiff 处理库，提供高精度计算、类型保留I/O、智能NoData处理、便捷的坐标转换和矢量裁剪等特性。"
---

# rstiff：高精度、类型保留的 Rust GeoTiff 处理库

## 引言

在地理空间数据处理领域，GeoTiff 是最常用的栅格数据格式之一。无论是遥感影像、数字高程模型（DEM），还是各类地理栅格数据，GeoTiff 都扮演着重要角色。然而，在使用 Rust 进行 GeoTiff 处理时，开发者往往面临着一些挑战：

- **数据类型转换问题**：读取和写入时容易丢失原始数据类型
- **NoData 值处理复杂**：不同数据类型的 NoData 值处理不一致
- **坐标转换繁琐**：投影转换需要手动计算新的边界和分辨率
- **矢量裁剪困难**：使用矢量文件裁剪栅格数据缺乏便捷工具

为了解决这些问题，我开发了 **rstiff** —— 一个基于 GDAL 的高精度、类型保留的 Rust GeoTiff 处理库。

## 核心特性

### 1. 🎯 高精度计算

rstiff 将所有数据加载为 `ndarray::Array3<f64>`，确保在科学计算中保持最高精度。无论原始数据是 8 位整型还是 16 位无符号整型，在内存中都以双精度浮点数处理，避免了精度损失。

```rust
use rstiff::GeoTiff;

// 读取任意类型的 GeoTiff，内部统一为 f64
let tif = GeoTiff::read("satellite_image.tif")?;

// 在 f64 精度下进行科学计算
let mean = tif.data.mean().unwrap();
let std = tif.data.std(0.0);
```

### 2. 🔄 类型保留的 I/O

读取时自动识别原始数据类型，写入时自动恢复。这意味着：

- 输入是 `Byte` (u8)，输出也是 `Byte`
- 输入是 `UInt16`，输出也是 `UInt16`
- 输入是 `Float32`，输出也是 `Float32`

无需手动指定数据类型，库会自动处理一切：

```rust
// 读取 UInt16 类型的 GeoTiff
let tif = GeoTiff::read("dem_uint16.tif")?;

// 进行一些处理...
let processed = tif.data.mapv(|x| x * 1.5);

// 写回时自动保持 UInt16 类型
let mut result = tif;
result.data = processed;
result.write("output.tif")?;  // 输出仍为 UInt16
```

### 3. 🎭 智能 NoData 处理

rstiff 能够正确识别和处理各种 NoData 值：

- 自动读取 GeoTiff 中定义的 NoData 值
- 对于浮点型数据，支持 `NaN` 作为 NoData
- 写入时保持 NoData 值的透明度
- 如果原始文件没有 NoData，输出也不会添加

```rust
let tif = GeoTiff::read("optical_image.tif")?;

// NoData 值已自动识别
if let Some(nodata) = tif.nodata_value {
    println!("NoData value: {}", nodata);
}

// 写入时会保持 NoData 的透明度和元数据
tif.write("output.tif")?;
```

### 4. 🌍 便捷的坐标转换

使用 rstiff，投影转换变得异常简单。库会自动计算新的边界和像素分辨率：

```rust
// 将 WGS84 投影转换为 UTM
let tif = GeoTiff::read("wgs84_data.tif")?;

// 一行代码完成投影转换（EPSG:32650 是 UTM Zone 50N）
let utm_tif = tif.reproject(32650)?;

utm_tif.write("utm_data.tif")?;
```

无需手动计算：
- ✅ 新的地理边界
- ✅ 新的像素分辨率
- ✅ 重采样方法
- ✅ 输出尺寸

一切都由 GDAL 和 rstiff 自动处理！

### 5. ✂️ 矢量裁剪与掩膜

支持使用多种矢量格式（Shapefile、KML、GeoJSON 等）对栅格进行裁剪：

```rust
let tif = GeoTiff::read("large_scene.tif")?;

// 使用 KML 文件裁剪，并应用掩膜
// mask=true 表示将多边形外的像素设为 NoData
let cropped = tif.crop_by_vector("region_of_interest.kml", true)?;

cropped.write("clipped_result.tif")?;
```

### 6. ⚡ 高效压缩

输出文件自动使用 LZW 压缩和预测器，在保证质量的同时大幅减小文件体积：

```rust
// 写入时自动应用 LZW 压缩
tif.write("compressed_output.tif")?;
// 输出文件通常比未压缩版本小 50-70%
```

## 技术架构

### 依赖项

rstiff 构建在几个优秀的 Rust 生态项目之上：

- **[GDAL](https://github.com/georust/gdal)** (v0.18.0)：提供强大的地理空间数据 I/O 能力
- **[ndarray](https://github.com/rust-ndarray/ndarray)** (v0.17.1)：N 维数组，Rust 科学计算的基石
- **[thiserror](https://github.com/dtolnay/thiserror)** (v2.0.17)：优雅的错误处理

### 核心数据结构

```rust
pub struct GeoTiff {
    pub data: Array3<f64>,           // 三维数组 [bands, height, width]
    pub transform: GeoTransform,      // 地理变换参数
    pub projection: String,           // 投影信息（WKT 格式）
    pub nodata_value: Option<f64>,    // NoData 值
    data_type: GdalDataType,          // 原始数据类型（用于写回）
}
```

## 使用场景

### 场景 1：遥感影像批处理

处理多景遥感影像，统一投影并裁剪到研究区：

```rust
use rstiff::GeoTiff;
use std::path::Path;

fn process_satellite_images() -> Result<(), Box<dyn std::error::Error>> {
    let images = vec!["scene1.tif", "scene2.tif", "scene3.tif"];
    let roi = "study_area.geojson";
    let target_epsg = 32650;  // UTM Zone 50N

    for img in images {
        let tif = GeoTiff::read(img)?;
        
        // 投影转换
        let reprojected = tif.reproject(target_epsg)?;
        
        // 裁剪到研究区
        let cropped = reprojected.crop_by_vector(roi, true)?;
        
        // 保存结果
        let output = format!("processed_{}", img);
        cropped.write(&output)?;
        
        println!("✓ Processed {}", img);
    }
    
    Ok(())
}
```

### 场景 2：DEM 数据处理

读取 DEM，计算坡度，保持原始精度：

```rust
fn calculate_slope(dem_path: &str) -> Result<(), Box<dyn std::error::Error>> {
    let dem = GeoTiff::read(dem_path)?;
    
    // 获取像素分辨率
    let res_x = dem.transform[1];
    let res_y = dem.transform[5].abs();
    
    // 计算坡度（简化示例）
    let slope = calculate_slope_from_dem(&dem.data, res_x, res_y);
    
    // 创建新的 GeoTiff
    let mut slope_tif = dem;
    slope_tif.data = slope;
    
    slope_tif.write("slope.tif")?;
    Ok(())
}
```

### 场景 3：多光谱影像处理

处理多波段卫星影像，计算植被指数：

```rust
fn calculate_ndvi(image_path: &str) -> Result<(), Box<dyn std::error::Error>> {
    let img = GeoTiff::read(image_path)?;
    
    // 假设波段 4 是 NIR，波段 3 是 Red
    let nir = img.data.slice(s![3, .., ..]);
    let red = img.data.slice(s![2, .., ..]);
    
    // 计算 NDVI = (NIR - Red) / (NIR + Red)
    let ndvi = (&nir - &red) / (&nir + &red);
    
    // 创建单波段 NDVI 影像
    let mut ndvi_tif = img;
    ndvi_tif.data = ndvi.insert_axis(Axis(0)).to_owned();
    
    ndvi_tif.write("ndvi.tif")?;
    Ok(())
}
```

## 安装与使用

### 前置要求

首先安装 GDAL：

**macOS (Homebrew):**
```bash
brew install gdal
```

**Ubuntu/Debian:**
```bash
sudo apt-get install libgdal-dev
```

### 添加到项目

在 `Cargo.toml` 中添加：

```toml
[dependencies]
rstiff = "0.1.0"
```

或使用 cargo：

```bash
cargo add rstiff
```

### 快速开始

```rust
use rstiff::GeoTiff;

fn main() -> Result<(), Box<dyn std::error::Error>> {
    // 读取 GeoTiff
    let tif = GeoTiff::read("input.tif")?;
    
    // 查看信息
    println!("尺寸: {:?}", tif.data.dim());
    println!("投影: {}", tif.projection);
    
    // 处理数据
    let processed = tif.data.mapv(|x| x * 2.0);
    
    // 写回
    let mut result = tif;
    result.data = processed;
    result.write("output.tif")?;
    
    Ok(())
}
```

## 性能与优化

rstiff 在设计时充分考虑了性能：

- ✅ 使用 GDAL 的 C++ 后端，IO 性能优异
- ✅ 利用 ndarray 的并行计算能力
- ✅ 自动 LZW 压缩减小文件体积
- ✅ 内存效率高，适合处理大型栅格数据

## 未来计划

- [ ] 栅格基础功能完善
- [ ] 如投影定义等等

## 开源与贡献

rstiff 是一个开源项目，采用 MIT 许可证。

- **GitHub**: [https://github.com/csuhqf/rstiff](https://github.com/csuhqf/rstiff)
- **Crates.io**: [https://crates.io/crates/rstiff](https://crates.io/crates/rstiff)
- **文档**: [https://docs.rs/rstiff](https://docs.rs/rstiff)

欢迎提交 Issue 和 Pull Request！如果这个库对你有帮助，请给个 Star ⭐️

## 结语

rstiff 的目标是让 Rust 开发者能够以最简洁的方式处理 GeoTiff 数据，同时保证精度和类型安全。无论你是在进行科学研究、开发 GIS 应用，还是处理遥感数据，rstiff 都能成为你的得力助手。

立即尝试 rstiff，体验 Rust 在地理空间数据处理中的强大能力！

```bash
cargo add rstiff
```

---

*如有问题或建议，欢迎在 GitHub 上联系我！*
