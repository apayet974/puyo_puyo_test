//GRID PROPERTIES
export const GRID_MAX_WIDTH = 5;
export const GRID_MIN_WIDTH = 0;
export const GRID_MAX_HEIGHT = 11;
export const GRID_MIN_HEIGHT = 0;
export const ROW_NUMBERS = 12;
export const COLUMN_NUMBERS = 6;
export const MIN_CHAIN_LENGTH=4;
export const DEFAULT_PUYO_PAIR_COLUMN_INDEX=2;

//GAME BOARD STYLE
export const GAME_BOARD_HEIGHT = '600px';
export const GAME_BOARD_WIDTH = '300px';
export const GAME_BOARD_CELL_LENGTH = '50';
export const GAME_BOARD_PLAY_BG = 'gray';
export const GAME_BOARD_GAME_OVER_BG = 'black';


//COLORS
export const EMPTY_CELL = 'EMPTY_CELL'
export const COLOR_BLUE = 'BLUE';
export const COLOR_RED = 'RED';
export const COLOR_YELLOW = 'YELLOW';
export const COLOR_GREEN = 'GREEN';
export const PUYO_COLORS_LIST = [COLOR_BLUE,COLOR_RED, COLOR_YELLOW, COLOR_GREEN];
export const PUYO_COLORS_MAPPING = {
    BLUE : 'blue',
    RED : 'red',
    YELLOW : 'yellow',
    GREEN : 'green'
};

//GAME PAHSES
export const PHASE_PLAYING = 'PLAYING';
export const PHASE_DROPPING = 'DROPPING';
export const PHASE_COMPUTING = 'COMPUTING';
export const PHASE_GAME_OVER = 'GAME_OVER';
export const GAME_PHASES = [PHASE_PLAYING, PHASE_DROPPING, PHASE_COMPUTING, PHASE_GAME_OVER];

//COMMANDS
export const CMD_MOVE_RIGHT = 'ArrowRight';
export const CMD_MOVE_RIGHT_ALT = 'KeyD';
export const CMD_MOVE_LEFT = 'ArrowLeft';
export const CMD_MOVE_LEFT_ALT = 'KeyA';
export const CMD_ROTATION_UP = 'ArrowUp';
export const CMD_ROTATION_UP_ALT = 'KeyW';
export const CMD_ROTATION_BACK = 'ArrowDown';
export const CMD_ROTATION_BACK_ALT = 'KeyS';
export const CMD_INSTANT_DROP = 'Space';

//PUYO POSITIONS
export const POSITION_TOP = 'TOP';
export const POSITION_RIGHT = 'RIGHT';
export const POSITION_BOTTOM = 'BOTTOM';
export const POSITION_LEFT = 'LEFT';
export const PUYO_PAIR_POSITIONS = [POSITION_TOP, POSITION_RIGHT, POSITION_BOTTOM, POSITION_LEFT];
export const ROTATION_UP = 'UP';
export const ROTATION_BACK = 'BACK';

//PUYO DIMENSIONS
export const PUYO_RADIUS = '20';
export const GRID_CELL_SIZE = '50';

//VELOCITY
// the velocity is expressed in ms to go from pixel to pixel
export const DROP_VELOCITY='1';
export const DEFAULT_VELOCITY= '100';
export const PIXEL_BY_INTERVAL = '1';
export const MAX_VELOCITY = '5';

export const LEVEL_CHANGE_PERIOD = '60000';
