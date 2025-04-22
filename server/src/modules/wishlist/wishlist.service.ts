import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Wishlist, WishlistDocument } from './schemas/wishlist.schema';
import { Model, Types } from 'mongoose';
import { AddToWishlistDto } from './dto/add-to-wishlist.dto';

@Injectable()
export class WishlistService {
  constructor(
    @InjectModel(Wishlist.name)
    private wishlistModel: Model<WishlistDocument>,
  ) {}

  async getWishlist(userId: string) {
    return this.wishlistModel
      .findOne({ user: userId })
      .populate('items.product')
      .lean()
      .exec();
  }

  async addToWishlist(userId: string, dto: AddToWishlistDto) {
    let wishlist = await this.wishlistModel.findOne({ user: userId });

    const productObjectId = new Types.ObjectId(dto.productId);

    if (!wishlist) {
      wishlist = new this.wishlistModel({
        user: userId,
        items: [{ product: productObjectId }],
      });
    } else {
      const existingItem = wishlist.items.find(
        (item) => item.product.toString() === dto.productId,
      );

      if (existingItem) {
        // Remove item
        wishlist.items = wishlist.items.filter(
          (item) => item.product.toString() !== dto.productId,
        );
      } else {
        // Add item
        wishlist.items.push({ product: productObjectId });
      }
    }

    await wishlist.save();

    // Populate and return the full updated wishlist
    const updatedWishlist = await this.getWishlist(userId);

    return updatedWishlist;
  }

  async removeFromWishlist(userId: string, productId: string) {
    const wishlist = await this.wishlistModel.findOne({ user: userId }).exec();

    if (!wishlist) throw new NotFoundException('Wishlist not found');

    wishlist.items = wishlist.items.filter(
      (item) => item.product.toString() !== productId,
    );

    await wishlist.save();

    // Populate and return the full updated wishlist
    const updatedWishlist = await this.getWishlist(userId);

    return updatedWishlist;
  }

  async clearWishlist(userId: string) {
    const wishlist = await this.wishlistModel.findOne({ user: userId }).exec();

    if (!wishlist) throw new NotFoundException('Wishlist not found');

    wishlist.items = [];
    return wishlist.save();
  }
}
