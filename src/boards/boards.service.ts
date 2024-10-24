import { Injectable } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
  private boards: Board[] = [];

  getAllBoards(): Board[] {
    return this.boards;
  }

  getBoardById(id: string): Board {
    return this.boards.find(board => board.id === id);
  }

  createBoard(createBoardDto: CreateBoardDto): Board {
    const { title, description }= createBoardDto;
    const board: Board = {
      id: uuid(),
      title,
      description,
      status: BoardStatus.PUBLIC
    };
    this.boards.push(board);
    return board;
  }

  deleteBoard(id: string): void {
    this.boards = this.boards.filter(board => board.id!== id);
  }

  updateBoardStatus(id: string, status: BoardStatus): Board {
    const board: Board = this.getBoardById(id);
    board.status = status;
    return board;
  }


}
