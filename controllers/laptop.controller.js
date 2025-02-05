const Product = require("../models/product.model");
const Laptop = require("../models/laptop.model");
const LaptopDetail = require("../models/laptopDetail.model");
const LaptopVariant = require("../models/laptopvariant.model");
const LaptopVariantField = require("../models/laptopvariantfield.model");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const deleteFile = (filePath) => {
  const fullPath = path.join(__dirname, "../public", filePath);
  if (fs.existsSync(fullPath)) {
    fs.unlinkSync(fullPath);
  }
};

class LaptopController {
  async getAll(req, res) {
    try {
      const laptops = await Laptop.find()
        .populate("category_id")
        .populate("brand_id");

      const laptopsWithDetails = await Promise.all(
        laptops.map(async (laptop) => {
          const variants = await LaptopVariant.find({
            product_id: laptop._id,
          });

          const variantsWithDetails = await Promise.all(
            variants.map(async (variant) => {
              const laptopDetail = await LaptopDetail.findOne({
                variant_id: variant._id,
              });

              const variantField = laptopDetail
                ? await LaptopVariantField.findById(
                    laptopDetail.variant_field_id
                  )
                : null;

              return {
                _id: variant._id,
                variant_name: variant.variant_name,
                price: variant.price,
                images: variant.images,
                specifications: {
                  part_number: variantField?.part_number || "",
                  mfg_year: variantField?.mfg_year || "",
                  origin: variantField?.origin || "",
                  weight: variantField?.weight || 0,
                  color: variantField?.color || "",
                  material: variantField?.material || "",
                  max_ram_up: variantField?.max_ram_up || "",
                  max_drive_up: variantField?.max_drive_up || "",
                  whd_size: variantField?.whd_size || "",
                  cpu: {
                    brand: variantField?.cpu?.brand || "",
                    name: variantField?.cpu?.name || "",
                    model: variantField?.cpu?.model || "",
                    min_rate: variantField?.cpu?.min_rate || "",
                  },
                  vga: {
                    brand: variantField?.vga?.brand || "",
                    name: variantField?.vga?.name || "",
                    model: variantField?.vga?.model || "",
                  },
                  ram: {
                    type: variantField?.ram?.type || "",
                    storage: variantField?.ram?.storage || 0,
                    slots: variantField?.ram?.slots || 0,
                  },
                  drive: {
                    type: variantField?.drive?.type || "",
                    model: variantField?.drive?.model || "",
                    storage: variantField?.drive?.storage || 0,
                    slots: variantField?.drive?.slots || 0,
                  },
                  screen: {
                    size: variantField?.screen?.size || 0,
                    type: variantField?.screen?.type || "",
                    resolution: variantField?.screen?.resolution || 0,
                    refresh_rate: variantField?.screen?.refresh_rate || 0,
                    color_rate: variantField?.screen?.color_rate || "",
                    ratio: variantField?.screen?.ratio || "",
                  },
                  port: {
                    wifi: variantField?.port?.wifi || "",
                    bluetooth: variantField?.port?.bluetooth || "",
                    webcam: variantField?.port?.webcam || "",
                    usb_type1: variantField?.port?.usb_type1 || "",
                    usb_number1: variantField?.port?.usb_number1 || 0,
                    usb_type2: variantField?.port?.usb_type2 || "",
                    usb_number2: variantField?.port?.usb_number2 || 0,
                    hdmi_type: variantField?.port?.hdmi_type || "",
                    hdmi_number: variantField?.port?.hdmi_number || 0,
                    cardreader_number:
                      variantField?.port?.cardreader_number || 0,
                    jack35mm_number: variantField?.port?.jack35mm_number || 0,
                  },
                  os: {
                    name: variantField?.os?.name || "",
                    version: variantField?.os?.version || "",
                  },
                  keyboard: {
                    type: variantField?.keyboard?.type || "",
                    led: variantField?.keyboard?.led || "",
                    numbpad: variantField?.keyboard?.numbpad || false,
                    touchpad: variantField?.keyboard?.touchpad || "",
                  },
                  power: {
                    capability: variantField?.power?.capability || 0,
                    supply: variantField?.power?.supply || 0,
                  },
                  gears: variantField?.gears || [],
                },
              };
            })
          );

          return {
            _id: laptop._id,
            product_name: laptop.product_name,
            brand: {
              _id: laptop.brand_id?._id,
              name: laptop.brand_id?.name,
            },
            category: {
              _id: laptop.category_id?._id,
              name: laptop.category_id?.category_name,
            },
            description: laptop.description,
            images: laptop.images,
            cpu_brand: laptop.cpu_brand,
            vga_brand: laptop.vga_brand,
            size: laptop.size,
            variants: variantsWithDetails,
          };
        })
      );

      return res.status(200).json(laptopsWithDetails);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách laptop:", error);
      return res.status(400).json({
        message: "Lỗi khi lấy danh sách laptop",
        error: error.message,
      });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;

      const laptop = await Laptop.findById(id).populate({
        path: "product_id",
        populate: [{ path: "category_id" }, { path: "brand_id" }],
      });

      if (!laptop) {
        return res.status(404).json({
          message: "Không tìm thấy laptop",
        });
      }

      const variants = await LaptopVariant.find({
        product_id: laptop._id,
      });

      const variantsWithDetails = await Promise.all(
        variants.map(async (variant) => {
          const laptopDetail = await LaptopDetail.findOne({
            variant_id: variant._id,
          });

          const variantField = laptopDetail
            ? await LaptopVariantField.findById(laptopDetail.variant_field_id)
            : null;

          return {
            ...variant.toObject(),
            specifications: variantField,
          };
        })
      );

      const result = {
        _id: laptop._id,
        product_name: laptop.product_name,
        brand: {
          _id: laptop.brand_id?._id,
          name: laptop.brand_id?.name,
        },
        category: {
          _id: laptop.category_id?._id,
          name: laptop.category_id?.category_name,
        },
        description: laptop.description,
        images: laptop.images,
        cpu_brand: laptop.cpu_brand,
        vga_brand: laptop.vga_brand,
        size: laptop.size,
        variants: variantsWithDetails,
      };

      return res.status(200).json(result);
    } catch (error) {
      console.error("Lỗi khi lấy thông tin laptop:", error);
      return res.status(400).json({
        message: "Lỗi khi lấy thông tin laptop",
        error: error.message,
      });
    }
  }

  async create(req, res) {
    try {
      const {
        category_id,
        brand_id,
        product_name,
        description,
        cpu_brand,
        vga_brand,
        size,
      } = req.body;

      const laptopImages =
        req.files?.images?.map((file) => ({
          url: `/uploads/${file.filename}`,
          public_id: file.filename,
        })) || [];

      const variantImages =
        req.files?.variantImages?.map((file) => ({
          url: `/uploads/${file.filename}`,
          public_id: file.filename,
        })) || [];

      let variants = [];
      try {
        variants = JSON.parse(req.body.variants || "[]");
      } catch (error) {
        console.error("Lỗi parse variants:", error);
        variants = [];
      }

      if (!product_name || !brand_id || !category_id) {
        return res.status(400).json({
          message: "Thiếu thông tin bắt buộc",
        });
      }

      if (!variants || variants.length === 0) {
        return res.status(400).json({
          message: "Cần ít nhất một biến thể",
        });
      }

      const partNumbers = variants.map((v) => v.part_number);
      const existingVariants = await LaptopVariantField.find({
        part_number: { $in: partNumbers },
      });

      if (existingVariants.length > 0) {
        return res.status(400).json({
          message: "Một số Part Number đã tồn tại",
          duplicates: existingVariants.map((v) => v.part_number),
        });
      }

      const laptop = await Laptop.create({
        category_id,
        brand_id,
        product_name,
        description: description || "",
        images: laptopImages,
        cpu_brand,
        vga_brand,
        size,
      });

      const createdVariants = await Promise.all(
        variants.map(async (variant, index) => {
          const newVariant = await LaptopVariant.create({
            product_id: laptop._id,
            variant_name: variant.variant_name,
            price: Number(variant.price),
            images: variantImages.slice(index * 5, (index + 1) * 5),
          });

          const variantField = await LaptopVariantField.create({
            part_number:
              variant.specifications?.part_number || `PN-${Date.now()}`,
            mfg_year:
              variant.specifications?.mfg_year ||
              new Date().getFullYear().toString(),
            origin: variant.specifications?.origin || "",
            weight: variant.specifications?.weight || 0,
            color: variant.specifications?.color || "",
            material: variant.specifications?.material || "",
            max_ram_up: variant.specifications?.max_ram_up || 1,
            max_drive_up: variant.specifications?.max_drive_up || 1,
            whd_size: variant.specifications?.whd_size || "",
            cpu: {
              brand: variant.specifications?.cpu?.brand || "",
              name: variant.specifications?.cpu?.name || "",
              model: variant.specifications?.cpu?.model || "",
              min_rate: variant.specifications?.cpu?.min_rate || "",
            },
            vga: {
              brand: variant.specifications?.vga?.brand || "",
              name: variant.specifications?.vga?.name || "",
              model: variant.specifications?.vga?.model || "",
            },
            ram: {
              type: variant.specifications?.ram?.type || "",
              storage: variant.specifications?.ram?.storage || 1,
              slots: variant.specifications?.ram?.slots || 1,
            },
            drive: {
              type: variant.specifications?.drive?.type || "",
              model: variant.specifications?.drive?.model || "",
              storage: variant.specifications?.drive?.storage || 1,
              slots: variant.specifications?.drive?.slots || 1,
            },
            screen: {
              size: variant.specifications?.screen?.size || 10,
              type: variant.specifications?.screen?.type || "",
              resolution: variant.specifications?.screen?.resolution || 720,
              refresh_rate: variant.specifications?.screen?.refresh_rate || 30,
              color_rate: variant.specifications?.screen?.color_rate || "",
              ratio: variant.specifications?.screen?.ratio || "",
            },
            port: variant.specifications?.port || {},
            os: variant.specifications?.os || {},
            keyboard: variant.specifications?.keyboard || {},
            power: {
              capability: variant.specifications?.power?.capability || 10,
              supply: variant.specifications?.power?.supply || 30,
            },
            gears: variant.specifications?.gears || [],
          });

          const laptopDetail = await LaptopDetail.create({
            variant_id: newVariant._id,
            variant_field_id: variantField._id,
          });

          return {
            ...newVariant.toObject(),
            specifications: variantField,
            detail: laptopDetail,
          };
        })
      );

      return res.status(201).json({
        message: "Tạo laptop mới thành công",
        data: {
          ...laptop.toObject(),
          variants: createdVariants,
        },
      });
    } catch (error) {
      if (error instanceof multer.MulterError) {
        return res.status(400).json({
          message: "Lỗi upload file",
          error: error.message,
        });
      }
      console.error("Lỗi khi tạo laptop:", error);
      return res.status(400).json({
        message: "Lỗi khi tạo laptop mới",
        error: error.message,
      });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      const laptop = await Laptop.findById(id);
      if (!laptop) {
        return res.status(404).json({
          message: "Không tìm thấy laptop",
        });
      }

      laptop.images.forEach((image) => {
        if (image.url) {
          deleteFile(image.url);
        }
      });

      const variants = await LaptopVariant.find({ product_id: id });

      await Promise.all(
        variants.map(async (variant) => {
          variant.images.forEach((image) => {
            if (image.url) {
              deleteFile(image.url);
            }
          });

          const laptopDetail = await LaptopDetail.findOne({
            variant_id: variant._id,
          });
          if (laptopDetail) {
            await LaptopVariantField.findByIdAndDelete(
              laptopDetail.variant_field_id
            );
            await LaptopDetail.findByIdAndDelete(laptopDetail._id);
          }
          await LaptopVariant.findByIdAndDelete(variant._id);
        })
      );

      await Laptop.findByIdAndDelete(id);

      return res.status(200).json({
        message: "Đã xóa laptop và các thông tin liên quan thành công",
      });
    } catch (error) {
      console.error("Lỗi khi xóa laptop:", error);
      return res.status(400).json({
        message: "Lỗi khi xóa laptop",
        error: error.message,
      });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const {
        category_id,
        brand_id,
        product_name,
        description,
        cpu_brand,
        vga_brand,
        size,
        variants,
        deletedVariants = [],
      } = req.body;

      const parsedVariants =
        typeof variants === "string" ? JSON.parse(variants) : variants;
      const parsedDeletedVariants =
        typeof deletedVariants === "string"
          ? JSON.parse(deletedVariants)
          : deletedVariants;

      const laptop = await Laptop.findByIdAndUpdate(
        id,
        {
          category_id,
          brand_id,
          product_name,
          description,
          cpu_brand,
          vga_brand,
          size,
          ...(req.files?.images?.length > 0 && {
            images: req.files.images.map((file) => ({
              url: `/uploads/${file.filename}`,
              public_id: file.filename,
            })),
          }),
        },
        { new: true }
      );

      if (!laptop) {
        return res.status(404).json({ message: "Không tìm thấy laptop" });
      }

      if (Array.isArray(parsedDeletedVariants)) {
        for (const variantId of parsedDeletedVariants) {
          const laptopDetail = await LaptopDetail.findOne({
            variant_id: variantId,
          });
          if (laptopDetail) {
            await LaptopVariantField.findByIdAndDelete(
              laptopDetail.variant_field_id
            );
            await LaptopDetail.findByIdAndDelete(laptopDetail._id);
          }
          await LaptopVariant.findByIdAndDelete(variantId);
        }
      }

      const updatedVariants = await Promise.all(
        parsedVariants.map(async (variant) => {
          if (variant._id) {
            const updatedVariant = await LaptopVariant.findByIdAndUpdate(
              variant._id,
              {
                variant_name: variant.variant_name,
                price: Number(variant.price),
                ...(variant.images?.length > 0 && {
                  images: variant.images.map((file) => ({
                    url: `/uploads/${file.filename}`,
                    public_id: file.filename,
                  })),
                }),
              },
              { new: true }
            );

            const laptopDetail = await LaptopDetail.findOne({
              variant_id: variant._id,
            });

            if (laptopDetail) {
              await LaptopVariantField.findByIdAndUpdate(
                laptopDetail.variant_field_id,
                {
                  part_number:
                    variant.specifications?.part_number || `PN-${Date.now()}`,
                  mfg_year:
                    variant.specifications?.mfg_year ||
                    new Date().getFullYear().toString(),
                  origin: variant.specifications?.origin || "",
                  weight: variant.specifications?.weight || 0,
                  color: variant.specifications?.color || "",
                  material: variant.specifications?.material || "",
                  max_ram_up: variant.specifications?.max_ram_up || 1,
                  max_drive_up: variant.specifications?.max_drive_up || 1,
                  whd_size: variant.specifications?.whd_size || "",
                  cpu: {
                    brand: variant.specifications?.cpu?.brand || "",
                    name: variant.specifications?.cpu?.name || "",
                    model: variant.specifications?.cpu?.model || "",
                    min_rate: variant.specifications?.cpu?.min_rate || "",
                  },
                  vga: {
                    brand: variant.specifications?.vga?.brand || "",
                    name: variant.specifications?.vga?.name || "",
                    model: variant.specifications?.vga?.model || "",
                  },
                  ram: {
                    type: variant.specifications?.ram?.type || "",
                    storage: variant.specifications?.ram?.storage || 1,
                    slots: variant.specifications?.ram?.slots || 1,
                  },
                  drive: {
                    type: variant.specifications?.drive?.type || "",
                    model: variant.specifications?.drive?.model || "",
                    storage: variant.specifications?.drive?.storage || 1,
                    slots: variant.specifications?.drive?.slots || 1,
                  },
                  screen: {
                    size: variant.specifications?.screen?.size || 10,
                    type: variant.specifications?.screen?.type || "",
                    resolution:
                      variant.specifications?.screen?.resolution || 720,
                    refresh_rate:
                      variant.specifications?.screen?.refresh_rate || 30,
                    color_rate:
                      variant.specifications?.screen?.color_rate || "",
                    ratio: variant.specifications?.screen?.ratio || "",
                  },
                  port: variant.specifications?.port || {},
                  os: variant.specifications?.os || {},
                  keyboard: variant.specifications?.keyboard || {},
                  power: {
                    capability: variant.specifications?.power?.capability || 10,
                    supply: variant.specifications?.power?.supply || 30,
                  },
                  gears: variant.specifications?.gears || [],
                },
                { new: true }
              );
            }

            return updatedVariant;
          } else {
            const newVariant = await LaptopVariant.create({
              product_id: laptop._id,
              variant_name: variant.variant_name,
              price: Number(variant.price),
              images:
                req.files?.variantImages?.map((file) => ({
                  url: `/uploads/${file.filename}`,
                  public_id: file.filename,
                })) || [],
            });

            const variantField = await LaptopVariantField.create({
              part_number:
                variant.specifications?.part_number || `PN-${Date.now()}`,
              mfg_year:
                variant.specifications?.mfg_year ||
                new Date().getFullYear().toString(),
              origin: variant.specifications?.origin || "",
              weight: variant.specifications?.weight || 0,
              color: variant.specifications?.color || "",
              material: variant.specifications?.material || "",
              max_ram_up: variant.specifications?.max_ram_up || 1,
              max_drive_up: variant.specifications?.max_drive_up || 1,
              whd_size: variant.specifications?.whd_size || "",
              cpu: {
                brand: variant.specifications?.cpu?.brand || "",
                name: variant.specifications?.cpu?.name || "",
                model: variant.specifications?.cpu?.model || "",
                min_rate: variant.specifications?.cpu?.min_rate || "",
              },
              vga: {
                brand: variant.specifications?.vga?.brand || "",
                name: variant.specifications?.vga?.name || "",
                model: variant.specifications?.vga?.model || "",
              },
              ram: {
                type: variant.specifications?.ram?.type || "",
                storage: variant.specifications?.ram?.storage || 1,
                slots: variant.specifications?.ram?.slots || 1,
              },
              drive: {
                type: variant.specifications?.drive?.type || "",
                model: variant.specifications?.drive?.model || "",
                storage: variant.specifications?.drive?.storage || 1,
                slots: variant.specifications?.drive?.slots || 1,
              },
              screen: {
                size: variant.specifications?.screen?.size || 10,
                type: variant.specifications?.screen?.type || "",
                resolution: variant.specifications?.screen?.resolution || 720,
                refresh_rate:
                  variant.specifications?.screen?.refresh_rate || 30,
                color_rate: variant.specifications?.screen?.color_rate || "",
                ratio: variant.specifications?.screen?.ratio || "",
              },
              port: variant.specifications?.port || {},
              os: variant.specifications?.os || {},
              keyboard: variant.specifications?.keyboard || {},
              power: {
                capability: variant.specifications?.power?.capability || 10,
                supply: variant.specifications?.power?.supply || 30,
              },
              gears: variant.specifications?.gears || [],
            });

            await LaptopDetail.create({
              variant_id: newVariant._id,
              variant_field_id: variantField._id,
            });

            return newVariant;
          }
        })
      );

      const updatedLaptop = await Laptop.findById(id)
        .populate("category_id")
        .populate("brand_id");

      return res.status(200).json({
        message: "Cập nhật laptop thành công",
        data: {
          ...updatedLaptop.toObject(),
          variants: updatedVariants,
        },
      });
    } catch (error) {
      console.error("Lỗi khi cập nhật laptop:", error);
      return res.status(400).json({
        message: "Lỗi khi cập nhật laptop",
        error: error.message,
      });
    }
  }
}

module.exports = new LaptopController();
