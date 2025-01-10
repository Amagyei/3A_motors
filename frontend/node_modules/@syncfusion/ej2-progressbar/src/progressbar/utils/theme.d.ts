/**
 * Theme of the progressbar
 */
import { ProgressTheme } from './index';
import { IProgressStyle } from '../model/progress-interface';
/**
 * Retrieves the theme color settings for a progress bar.
 *
 * @param {ProgressTheme} theme - The theme of the progress bar.
 * @returns {IProgressStyle} - The style settings for the progress bar based on the theme.
 * @private
 */
export declare function getProgressThemeColor(theme: ProgressTheme): IProgressStyle;
