import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from './posts.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Post } from './posts.entity';
import { Repository } from 'typeorm';

describe('PostsService', () => {
  let service: PostsService;
  let repository: jest.Mocked<Repository<Post>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        {
          provide: getRepositoryToken(Post),
          useValue: {
            find: jest.fn(() => Promise.resolve([])),
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PostsService>(PostsService);
    repository = module.get<Repository<Post>>(
      getRepositoryToken(Post),
    ) as jest.Mocked<Repository<Post>>;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of posts', async () => {
      const result: Post[] = [
        {
          id: 1,
          titulo: 'Test Post',
          conteudo: 'Test Content',
          autor: 'Test Author',
          dataCriacao: new Date(),
          dataAtualizacao: new Date(),
        },
      ];
      repository.find.mockResolvedValue(result);

      expect(await service.findAll()).toBe(result);
      expect(() => repository.find()).not.toThrow();
    });
  });

  describe('create', () => {
    it('should create a new post', async () => {
      const post = {
        titulo: 'Test Post',
        conteudo: 'Test Content',
        autor: 'Test Author',
      };
      const result: Post = {
        id: 1,
        ...post,
        dataCriacao: new Date(),
        dataAtualizacao: new Date(),
      };

      repository.create.mockReturnValue(result);
      repository.save.mockResolvedValue(result);
      const newPost = await service.create(post);

      expect(newPost).toEqual(result);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(repository.create).toHaveBeenCalledWith(post); // Ensure the post data is passed to create
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(repository.save).toHaveBeenCalledWith(result);
    });
  });
});
