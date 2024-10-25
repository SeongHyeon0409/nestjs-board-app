import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardRepository } from './board.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';

@Injectable()
export class BoardsService {

  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository,
  ) {}

  async getBoardById(id: number): Promise <Board> {
    const found = await this.boardRepository.findOneBy({id});
    if (!found) {
      throw new NotFoundException(`Board with ID "${id}" not found`);
    }
    return found;
  }
  // getAllBoards(): Board[] {
  //   return this.boards;
  // }

  // getBoardById(id: string): Board {
  //   const found =  this.boards.find(board => board.id === id);

  //   if(!found) {
  //     throw new NotFoundException(`Can't find board id ${id}`);
  //   }

  //   return found;
  // }

  // createBoard(createBoardDto: CreateBoardDto): Board {
  //   const { title, description }= createBoardDto;
  //   const board: Board = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: BoardStatus.PUBLIC
  //   };
  //   this.boards.push(board);
  //   return board;
  // }

  // deleteBoard(id: string): void {
  //   const found = this.getBoardById(id);
  //   this.boards = this.boards.filter(board => board.id!== found.id);
  // }

  // updateBoardStatus(id: string, status: BoardStatus): Board {
  //   const board: Board = this.getBoardById(id);
  //   board.status = status;
  //   return board;
  // }


}
