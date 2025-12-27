import type { ClassValue } from 'clsx';
import { hlm } from '@angular-ai-kit/spartan-ui/utils';
import type { BooleanInput, NumberInput } from '@angular/cdk/coercion';
import {
  ChangeDetectionStrategy,
  Component,
  booleanAttribute,
  computed,
  forwardRef,
  input,
  linkedSignal,
  model,
  numberAttribute,
  output,
} from '@angular/core';
import { type ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import type { ChangeFn, TouchFn } from '@spartan-ng/brain/forms';
import {
  BrnSlider,
  BrnSliderRange,
  BrnSliderThumb,
  BrnSliderTrack,
} from '@spartan-ng/brain/slider';

export const HLM_SLIDER_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => HlmSlider),
  multi: true,
};

@Component({
  selector: 'hlm-slider',
  imports: [BrnSlider, BrnSliderTrack, BrnSliderRange, BrnSliderThumb],
  providers: [HLM_SLIDER_VALUE_ACCESSOR],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'block',
  },
  template: `
    <div
      brnSlider
      [class]="_computedClass()"
      [value]="value()"
      (valueChange)="handleChange($event)"
      [min]="min()"
      [max]="max()"
      [step]="step()"
      [disabled]="_disabled()"
    >
      <div brnSliderTrack [class]="_trackClass()">
        <div brnSliderRange [class]="_rangeClass()"></div>
      </div>
      <div brnSliderThumb [class]="_thumbClass()"></div>
    </div>
  `,
})
export class HlmSlider implements ControlValueAccessor {
  public readonly userClass = input<ClassValue>('', { alias: 'class' });

  protected readonly _computedClass = computed(() =>
    hlm(
      'relative flex w-full touch-none select-none items-center h-4',
      this.userClass()
    )
  );

  protected readonly _trackClass = computed(() =>
    hlm(
      'bg-muted relative h-1.5 w-full grow overflow-hidden rounded-full cursor-pointer'
    )
  );

  protected readonly _rangeClass = computed(() =>
    hlm('bg-primary absolute h-full')
  );

  protected readonly _thumbClass = computed(() =>
    hlm(
      'border-primary bg-background ring-ring/50 absolute top-1/2 -translate-y-1/2 h-4 w-4 rounded-full border shadow-sm transition-colors',
      'focus-visible:ring-ring focus-visible:outline-none focus-visible:ring-2',
      'disabled:pointer-events-none disabled:opacity-50',
      'cursor-grab active:cursor-grabbing'
    )
  );

  /** The current value of the slider. */
  public readonly value = model<number>(0);

  /** Emits when the value changes. */
  public readonly valueChange = output<number>();

  /** The minimum value of the slider. */
  public readonly min = input<number, NumberInput>(0, {
    transform: numberAttribute,
  });

  /** The maximum value of the slider. */
  public readonly max = input<number, NumberInput>(100, {
    transform: numberAttribute,
  });

  /** The step value of the slider. */
  public readonly step = input<number, NumberInput>(1, {
    transform: numberAttribute,
  });

  /** The disabled state of the slider. */
  public readonly disabled = input<boolean, BooleanInput>(false, {
    transform: booleanAttribute,
  });

  protected readonly _disabled = linkedSignal(this.disabled);

  protected _onChange?: ChangeFn<number>;
  protected _onTouched?: TouchFn;

  protected handleChange(value: number): void {
    this.value.set(value);
    this._onChange?.(value);
    this.valueChange.emit(value);
  }

  /** CONTROL VALUE ACCESSOR */

  writeValue(value: number): void {
    this.value.set(value ?? 0);
  }

  registerOnChange(fn: ChangeFn<number>): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: TouchFn): void {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._disabled.set(isDisabled);
  }
}
