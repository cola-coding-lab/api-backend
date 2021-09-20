import { body, ValidationChain } from 'express-validator';

const COLOR_REGEXP = new RegExp(/^(?=(?:.{4}|.{7})$)#[0-9a-f]{3,6}$/, 'i');

export const pwaValidator: ValidationChain[] = [
  body('pwa_title')
    .trim()
    .escape()
    .isLength({ min: 1 })
    .bail(),
  body('pwa_color')
    .trim()
    .escape()
    .default('#000')
    .matches(COLOR_REGEXP),
  body('pwa_scripts')
    .isArray()
    .withMessage('needs to be an array')
    .isLength({ min: 1 })
    .withMessage('needs at least one entry')
    .escape()
    .bail(),
  body('pwa_css')
    .trim()
    .escape()
    .default('')
    .isString(),
  body('pwa_image')
    .trim()
    .escape()
    .isBase64(),
  body('pwa_description')
    .isString()
    .isLength({ min: 1 })
    .bail(),
];

export interface PwaInputData {
  pwa_title: string;
  pwa_color: string;
  pwa_scripts: string[];
  pwa_css: string;
  pwa_image?: string;
  pwa_description: string;
}
