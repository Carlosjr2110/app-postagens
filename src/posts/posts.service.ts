import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Post } from './posts.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async findAll(): Promise<Post[]> {
    return this.postRepository.find();
  }

  async searchPosts(term: string): Promise<Post[]> {
    if (!term || typeof term !== 'string' || term.trim() === '') {
      return [];
    }
    return this.postRepository.find({
      where: [{ titulo: ILike(`%${term}%`) }, { conteudo: ILike(`%${term}%`) }],
    });
  }

  async create(post: Partial<Post>): Promise<Post> {
    const newPost = this.postRepository.create(post);
    return this.postRepository.save(newPost);
  }

  async update(id: number, postData: Partial<Post>): Promise<Post> {
    await this.postRepository.update(id, postData);
    const post = await this.postRepository.findOne({ where: { id } });
    if (!post) {
      throw new Error(`Post with id ${id} not found`);
    }
    return post;
  }

  async delete(id: number): Promise<void> {
    await this.postRepository.delete(id);
  }
}
