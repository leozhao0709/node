import { Component, OnInit, HostBinding } from '@angular/core';

import { Project } from './project.model';
import { AnimationEvent } from '@angular/animations';

import { ProjectsService } from './projects.service';
import { markedTrigger, itemStateTrigger, slideStateTrigger } from './animations';
import { routeFadeStateTrigger, routeSlideStateTrigger } from '../shared/route-animation';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  animations: [
    markedTrigger,
    itemStateTrigger,
    slideStateTrigger,
    routeFadeStateTrigger,
    routeSlideStateTrigger
  ]
})
export class ProjectsComponent implements OnInit {
  projects: Project[];
  displayProjects: Project[] = [];

  markedPrjIndex = 0;
  progress = 'progressing';
  createNew = false;

  // @HostBinding('@routeFadeState') routeAnimation = true;
  @HostBinding('@routeSlideState') routeAnimation = true;

  constructor(private prjService: ProjectsService) { }

  ngOnInit() {
    this.prjService.loadProjects()
      .subscribe(
      (prj: Project[]) => {
        this.progress = 'finished';
        this.projects = prj;
        if (this.projects.length >= 1) {
          this.displayProjects.push(this.projects[0]);
        }
      }
      );
  }

  onStatusUpdated(newStatus: string, id: number) {
    this.projects[id].status = newStatus;
  }

  onProjectDeleted(index: number) {
    this.projects.splice(index, 1);
  }

  onProjectCreated(project: Project) {
    this.createNew = false;
    setTimeout(() => {
      this.projects.unshift(project);
    }, 300);
  }

  onItemAnimated(event: AnimationEvent, index: number) {
    if (event.fromState !== 'void') {
      return;
    }

    if (this.projects.length > index + 1) {
      this.displayProjects.push(this.projects[index + 1]);
    } else {
      this.displayProjects = this.projects;
    }
  }
}
