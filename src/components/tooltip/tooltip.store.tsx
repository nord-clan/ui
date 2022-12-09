/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { BasePlacement } from '@popperjs/core';
import { right } from '@popperjs/core';
import { makeAutoObservable, action, makeObservable, observable } from 'mobx';

export type TooltipStyle = 'warn' | 'error';

export interface ITooltipProps {
  title: string;
  delay?: number;
  placement?: BasePlacement;
  style?: TooltipStyle;
}

export interface ITooltipState {
  title: string;
  style: TooltipStyle;
  isVisible: boolean;
}

export interface ITooltipController {
  setTitle: (title: string) => void;
  setStyle: (style: TooltipStyle) => void;
  setIsVisible: (isVisible: boolean) => boolean;
  getState: () => ITooltipState;
}

export class TooltipStore {
  props: ITooltipProps;
  state: ITooltipState;
  timeout: number | undefined;

  get stateGetter(): ITooltipState {
    return {
      ...this.state
    };
  }

  controller = {
    setTitle: (title: string) => this.setTitle(title),
    setStyle: (style: TooltipStyle) => this.setStyle(style),
    setIsVisible: (isVisible: boolean) => this.setIsVisible(isVisible),
    getState: () => this.stateGetter
  } as ITooltipController;

  constructor(props: ITooltipProps) {
    const { title, delay, placement, style, ...rest } = props;

    this.props = {
      ...rest,
      title,
      delay: delay ?? 0,
      placement: placement ?? right,
      style: style ?? 'warn'
    };

    this.state = {
      title,
      style: style ?? 'warn',
      isVisible: false
    };

    this.timeout = undefined;

    makeAutoObservable(this.state, {
      isVisible: observable
    });

    makeObservable(this, {
      setTitle: action,
      setStyle: action,
      setIsVisible: action
    });
  }

  show = (): void => {
    this.timeout = window.setTimeout(() => {
      this.setIsVisible(true);
    }, this.props.delay);
  };

  hide = (): void => {
    window.clearTimeout(this.timeout);
    this.timeout = undefined;
    this.setIsVisible(false);
  };

  setIsVisible = (isVisible: boolean): boolean => (this.state.isVisible = isVisible);

  setTitle = (title: string): void => {
    this.state.title = title;
  };

  setStyle = (style: TooltipStyle): void => {
    this.state.style = style;
  };
}
