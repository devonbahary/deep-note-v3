import { colors } from '../constants';

export class ColorUtil {
    static getItemColor(color, theme) {
        return colors[color] || theme.palette.primary.main;
    }
}