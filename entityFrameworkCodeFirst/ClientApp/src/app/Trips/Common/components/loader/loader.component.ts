import { OnInit, Input, Component } from "@angular/core";

@Component({
    selector: 'loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.css']
})

export class LoaderComponent implements OnInit {

    @Input() isLoading = false;

    width = 250;
    height = 220;
    ngOnInit(): void {
        window.onresize = () => { };
    }


    getWidth() {
        return this.width;
    }

    getHeight(): number {
        return this.height;
    }

    getLeftPixels() {
        const windowWidth = window.innerWidth;
        return ((windowWidth * .5) - (this.width * .5)) + 'px';
    }
}
