import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { BoardRepository } from './board.repository';
import { User } from 'src/auth/user.entity';

@Injectable()
export class BoardsService {

  constructor(
    private boardRepository: BoardRepository,
  ) { }

  async getBoardById(id: number): Promise<Board> {
    const found = await this.boardRepository.findOneBy({ id });
    if (!found) {
      throw new NotFoundException(`Board with ID "${id}" not found`);
    }
    return found;
  }

  createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board> {
    return this.boardRepository.createBoard(createBoardDto, user);
  }

  async deleteBoard(id: number, user: User): Promise<void> {
    const result = await this.boardRepository.delete({ id, user });

    if (result.affected === 0) {
      throw new NotFoundException(`Board with ID "${id}" not found`);
    }

    console.log(result);
  }

  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const board: Board = await this.getBoardById(id);

    board.status = status;

    await this.boardRepository.save(board);

    return board;
  }

  async getAllBoards(
    user: User
  ): Promise<Board[]> {
    const query = this.boardRepository.createQueryBuilder('board');
    query.where('board.user = :userId', { userId: user.id });
    const boards = await query.getMany();

    return boards;
  }
}
