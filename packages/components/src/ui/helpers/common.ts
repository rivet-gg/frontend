import {
  MarginUtilitiesProps,
  getMarginClass,
  omitMarginProps,
} from "./margin";
import {
  MinHeightUtilitiesProps,
  getMinHeightClass,
  omitMinHeightProps,
} from "./min-height";
import {
  MinWidthUtilitiesProps,
  getMinWidthClass,
  omitMinWidthProps,
} from "./min-width";
import {
  PaddingUtilitiesProps,
  getPaddingClass,
  omitPaddingProps,
} from "./padding";
import {
  TextAlignUtilitiesProps,
  getTextAlignClass,
  omitTextAlignProps,
} from "./text-align";
import { WidthUtilitiesProps, getWidthClass, omitWidthProps } from "./width";

export interface CommonHelperProps
  extends MarginUtilitiesProps,
    PaddingUtilitiesProps,
    WidthUtilitiesProps,
    MinHeightUtilitiesProps,
    MinWidthUtilitiesProps,
    TextAlignUtilitiesProps {}

export function omitCommonHelperProps(props: Partial<CommonHelperProps>) {
  return omitTextAlignProps(
    omitMinWidthProps(
      omitMinHeightProps(
        omitMarginProps(omitPaddingProps(omitWidthProps(props))),
      ),
    ),
  );
}

export function getCommonHelperClass(props: Partial<CommonHelperProps>) {
  return [
    getMarginClass(props),
    getPaddingClass(props),
    getWidthClass(props),
    getMinHeightClass(props),
    getMinWidthClass(props),
    getTextAlignClass(props),
  ].join(" ");
}
