import type { Moment } from 'moment';
import * as React from 'react';
import DatePicker from '../date-picker';
import type { PickerTimeProps, RangePickerTimeProps } from '../date-picker/generatePicker';
import devWarning from '../_util/devWarning';
import type { InputStatus } from '../_util/statusUtils';

const { TimePicker: InternalTimePicker, RangePicker: InternalRangePicker } = DatePicker;

export interface TimePickerLocale {
  placeholder?: string;
  rangePlaceholder?: [string, string];
}

export interface TimeRangePickerProps extends Omit<RangePickerTimeProps<Moment>, 'picker'> {
  popupClassName?: string;
}

const RangePicker = React.forwardRef<any, TimeRangePickerProps>((props, ref) => (
  <InternalRangePicker
    {...props}
    dropdownClassName={props.popupClassName}
    picker="time"
    mode={undefined}
    ref={ref}
  />
));

export interface TimePickerProps extends Omit<PickerTimeProps<Moment>, 'picker'> {
  addon?: () => React.ReactNode;
  popupClassName?: string;
  status?: InputStatus;
}

const TimePicker = React.forwardRef<any, TimePickerProps>(
  ({ addon, renderExtraFooter, popupClassName, ...restProps }, ref) => {
    const internalRenderExtraFooter = React.useMemo(() => {
      if (renderExtraFooter) {
        return renderExtraFooter;
      }
      if (addon) {
        devWarning(
          false,
          'TimePicker',
          '`addon` is deprecated. Please use `renderExtraFooter` instead.',
        );
        return addon;
      }
      return undefined;
    }, [addon, renderExtraFooter]);

    return (
      <InternalTimePicker
        {...restProps}
        dropdownClassName={popupClassName}
        mode={undefined}
        ref={ref}
        renderExtraFooter={internalRenderExtraFooter}
      />
    );
  },
);

TimePicker.displayName = 'TimePicker';

type MergedTimePicker = typeof TimePicker & {
  RangePicker: typeof RangePicker;
};

(TimePicker as MergedTimePicker).RangePicker = RangePicker;

export default TimePicker as MergedTimePicker;
