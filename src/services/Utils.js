import { PUYO_COLORS_LIST, POSITION_RIGHT, COLOR_BLUE, POSITION_BOTTOM, POSITION_LEFT, POSITION_TOP, GAME_BOARD_CELL_LENGTH, PUYO_RADIUS } from "../constants";

export default class Utils {
    static generateRandomPuyoColor() {
        return PUYO_COLORS_LIST[Math.floor(Math.random() * 4)];
    }

    static generateRandomPuyoPair() {
        return {
            puyoAColor: Utils.generateRandomPuyoColor(),
            puyoBColor: Utils.generateRandomPuyoColor(),
            position: POSITION_RIGHT
        }
    }

    static getGameGridIndexesFromPuyoPair(posY,colIndex,  puyoPairPosition) {
        const rowIndex = Math.ceil((posY + parseInt(PUYO_RADIUS,10)) / parseInt(GAME_BOARD_CELL_LENGTH, 10));

        switch (puyoPairPosition) {
            case POSITION_RIGHT:
            return [{rowIndex, colIndex}, {rowIndex  ,colIndex: colIndex+ 1}];

            case POSITION_LEFT:
                return [{rowIndex, colIndex}, {rowIndex, colIndex: colIndex > 0 ? colIndex-1 :0}];
            case POSITION_BOTTOM:
            return [{ rowIndex : rowIndex > 0 ? rowIndex-1 :0 , colIndex}];

            case POSITION_TOP:
                return [{rowIndex, colIndex}];
            default: return [];


        }
    }

    static generateGridCellMapping = (rowIndex, colIndex) => `${rowIndex}x${colIndex}`;
} 