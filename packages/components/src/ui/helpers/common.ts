import {
  MarginUtilitiesProps,
  getMarginClass,
  omitMarginProps,
} from "./margin";
import {
  PaddingUtilitiesProps,
  getPaddingClass,
  omitPaddingProps,
} from "./padding";
import { WidthUtilitiesProps, getWidthClass, omitWidthProps } from "./width";

export interface CommonHelperProps
  extends MarginUtilitiesProps,
    PaddingUtilitiesProps,
    WidthUtilitiesProps {}

export function omitCommonHelperProps(props: Partial<CommonHelperProps>) {
  return omitMarginProps(omitPaddingProps(omitWidthProps(props)));
}

export function getCommonHelperClass(props: Partial<CommonHelperProps>) {
  return [
    getMarginClass(props),
    getPaddingClass(props),
    getWidthClass(props),
  ].join(" ");
}
