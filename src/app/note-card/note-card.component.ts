import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss']
})
export class NoteCardComponent implements OnInit {

  @Input() title: string;
  @Input() body: string;
  @Input() link: string;
  @Output('delete') deleteEvent: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild('truncator') truncator: ElementRef<HTMLElement>;
  @ViewChild('cardBody') cardBody: ElementRef<HTMLElement>;

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {}

  ngAfterViewInit() {
    // Work out if there is a text overflow and if not, then hide the truncator
    let style = window.getComputedStyle(this.cardBody.nativeElement, null);
    let viewableHeight = parseInt(style.getPropertyValue('height'), 10);

    if(this.cardBody.nativeElement.scrollHeight > viewableHeight) {
      // if there is no text overflow, show the fade out truncator
      this.renderer.setStyle(this.truncator.nativeElement, 'display', 'block');
    } else {
      //  else there is a text overflow, hide the fade out truncator
      this.renderer.setStyle(this.truncator.nativeElement, 'display', 'none');
    }
  }

  onDelete() {
    this.deleteEvent.emit();
  }
}
