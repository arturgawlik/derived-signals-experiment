import { Component, computed, input, signal } from '@angular/core';

@Component({
  selector: 'app-select',
  standalone: true,
  template: `
    <select
      #selectRef
      [value]="state().selectedOption()"
      (change)="setSelectedOption(selectRef.value)"
    >
      @for (option of state().options; track option) {
      <option id="option">
        {{ option }}
      </option>
      }
    </select>
  `,
})
export class SelectCmp {
  options = input<string[]>();

  protected readonly state = computed(() => {
    return {
      options: this.options(),
      selectedOption: signal<string | null>(null),
    };
  });

  setSelectedOption(selectedOption: string) {
    this.state().selectedOption.set(selectedOption);
  }
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SelectCmp],
  template: `
    <input type="text" #inputRef />
    <button style="margin-bottom: 100px;" (click)="setOption(inputRef.value)">
      submit option
    </button>

    <app-select [options]="options()" />
  `,
})
export class AppComponent {
  optionsStr = signal('');
  options = computed(() => this.optionsStr().split(';'));

  setOption(optionStr: string) {
    this.optionsStr.set(optionStr);
  }
}
