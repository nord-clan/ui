import React, { useEffect, useMemo, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import type { IOptionsTabsSlider, ITabsSliderProps } from './tabs-slider.store';
import { TabsSliderStore } from './tabs-slider.store';
import useIsMounted from '../../hooks/events/useIsMounted';
import {
  TabsSliderHeaderStyled,
  TabsSliderItemStyled,
  TabsSliderListStyled,
  TabsSliderStyled
} from './tabs-slider.style';

//* - COMPONENT ------------------------------------------------------------------------- *//
export const TabsSlider = observer(<T,>(props: ITabsSliderProps<T>) => {
  const { tipHight = '4px', width = 'auto', options, value, onChange, renderOption, headerText, defaultTab } = props;

  const store = useMemo(() => new TabsSliderStore<T>({ defaultActiveTab: options[defaultTab ?? 0] }), [options]);
  const { calculateTabsSize, tipSize, setActiveTab } = store;

  const sliderListRef = useRef<HTMLUListElement | null>(null);

  const handleOnClick = (tab: IOptionsTabsSlider<T>) => () => {
    if (onChange) onChange(tab);
    setActiveTab(tab);
  };

  const isMounted = useIsMounted();
  useEffect(() => {
    if (sliderListRef.current) calculateTabsSize(options, sliderListRef);
  }, [calculateTabsSize, isMounted, options]);

  return (
    <TabsSliderStyled width={width}>
      {headerText && (
        <TabsSliderHeaderStyled>
          <h1>{headerText}</h1>
        </TabsSliderHeaderStyled>
      )}
      <TabsSliderListStyled tipHight={tipHight} ref={sliderListRef}>
        <div />
        {isMounted() && <span style={{ ...tipSize }} />}

        {options.map((tab) => {
          return (
            <TabsSliderItemStyled
              onClick={handleOnClick(tab)}
              data-id={tab.value}
              key={tab.value}
              isSelected={value === tab}>
              {renderOption ? renderOption(tab) : <div>{tab.value}</div>}
            </TabsSliderItemStyled>
          );
        })}
      </TabsSliderListStyled>
    </TabsSliderStyled>
  );
});
