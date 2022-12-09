import { action, makeObservable, observable, computed } from 'mobx';

//* - INTERFACE ------------------------------------------------------------------------- *//
export interface IOptionsTabsSlider<T> {
  value: string | number;
  additional?: T;
}

export interface ITabsSliderProps<T> {
  tipHight?: string;
  defaultTab?: number;
  width?: string;
  renderOption?: (option: IOptionsTabsSlider<T>) => React.ReactNode;
  options: IOptionsTabsSlider<T>[];
  value?: IOptionsTabsSlider<T>;
  onChange?: (value: IOptionsTabsSlider<T>) => void;
  headerText?: string;
}

export interface ITabsSliderTipProps {
  width: number;
  left: number;
}

interface ITabsSize {
  id: string;
  width: number;
}

interface ITabsTip {
  width: number;
  left: number;
}

export interface ITabsSliderController<T> {
  setActiveTab: (activeTab: IOptionsTabsSlider<T>) => IOptionsTabsSlider<T>;
}

export interface ITabsSliderStoreParams<T> {
  defaultActiveTab: IOptionsTabsSlider<T>;
}

interface ITabsSliderStoreState<T> {
  activeTab: IOptionsTabsSlider<T>;
  tabsSizes: ITabsSize[];
}

//* - STORE ------------------------------------------------------------------------- *//
export class TabsSliderStore<T> {
  state: ITabsSliderStoreState<T>;
  params: ITabsSliderStoreParams<T>;

  constructor(params: ITabsSliderStoreParams<T>) {
    this.params = params;

    this.state = {
      activeTab: params.defaultActiveTab,
      tabsSizes: []
    };

    makeObservable(this.state, {
      activeTab: observable,
      tabsSizes: observable
    });

    makeObservable(this, {
      setActiveTab: action,
      calculateTabsSize: action,
      tipSize: computed
    });
  }

  setActiveTab = (tab: IOptionsTabsSlider<T>): IOptionsTabsSlider<T> => (this.state.activeTab = tab);

  getControlller = (): ITabsSliderController<T> => {
    const { setActiveTab } = this;
    return {
      setActiveTab
    };
  };

  calculateTabsSize = (tabsProps: IOptionsTabsSlider<T>[], tabsRef: React.RefObject<HTMLUListElement>): void => {
    if (!tabsRef.current) return;
    const refs = tabsRef.current.getElementsByTagName('li');
    if (!refs) return;

    const elements: ITabsSize[] = [];
    tabsProps.forEach((_, key) =>
      elements.push({
        id: refs[key].getAttribute('data-id') as string,
        width: +refs[key].getBoundingClientRect().width.toFixed(2)
      })
    );

    this.state.tabsSizes = elements;
  };

  get tipSize(): ITabsTip {
    const { activeTab, tabsSizes } = this.state;

    let isFound = false;
    const sum = tabsSizes.reduce((prev, now) => {
      if (now.id === activeTab.value || isFound) {
        isFound = true;
        return prev;
      }
      return prev + now.width;
    }, 0);

    return { width: tabsSizes.find((f) => f.id === activeTab.value)?.width ?? 0, left: sum };
  }
}
