import {
  MarginUtilitiesProps,
  getMarginClass,
  omitMarginProps,
} from "./margin";
import {
  MinHeightUtilitiesProps,
  getMinWidthClass,
  omitMinHeightProps,
} from "./min-height";
import {
  PaddingUtilitiesProps,
  getPaddingClass,
  omitPaddingProps,
} from "./padding";
import { WidthUtilitiesProps, getWidthClass, omitWidthProps } from "./width";

export interface CommonHelperProps
  extends MarginUtilitiesProps,
    PaddingUtilitiesProps,
    WidthUtilitiesProps,
    MinHeightUtilitiesProps {}

export function omitCommonHelperProps(props: Partial<CommonHelperProps>) {
  return omitMinHeightProps(
    omitMarginProps(omitPaddingProps(omitWidthProps(props))),
  );
}

export function getCommonHelperClass(props: Partial<CommonHelperProps>) {
  return [
    getMarginClass(props),
    getPaddingClass(props),
    getWidthClass(props),
    getMinWidthClass(props),
  ].join(" ");
}
