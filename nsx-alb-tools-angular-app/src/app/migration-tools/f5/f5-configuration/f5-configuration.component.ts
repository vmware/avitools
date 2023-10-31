import {
  Component,
  OnInit
} from '@angular/core';

import { ConfigurationTabService } from 'src/app/shared/configuration-tab-response-data/configuration-tab-response-data.service';

import {
  incompleteVsMigration,
  incompleteVsMigrationsData,
  labController,
} from './f5-configuration.types';

import { ClrFormLayout } from '@clr/angular';
import { lastValueFrom } from 'rxjs';
import * as l10n from './f5-configuration.l10n';
import { HttpService } from 'src/app/shared/http/http.service';

const { ENGLISH: dictionary } = l10n;

@Component({
  selector: 'f5-configuration',
  templateUrl: './f5-configuration.component.html',
  styleUrls: ['./f5-configuration.component.less'],
})
export class F5ConfigurationComponent implements OnInit {
  public incompleteVSMigrationsData: incompleteVsMigration[] = [];

  public labControllerDetails: labController;

  public selectedMigrationIndex = 0;

  public completedVSMigrationsCount = 0;

  public isOpenVsConfigEditorModal = false;

  public openEditControllerConfig = false;

  public readonly verticalLayout = ClrFormLayout.VERTICAL;

  public migrationOverviewData;

  public dictionary = dictionary;

  constructor(
    public readonly configurationTabService: ConfigurationTabService,
    private http: HttpService,
  ) { }


  /** @override */
  public async ngOnInit(): Promise<void> {
    await this.getAllIncompleteVSMigrationsData();
    await this.getLabControllerDetails();
    await this.getMigrationOverviewData();
  }

  public handleCloseVsConfigEditor(): void {
     this.isOpenVsConfigEditorModal = false;
  }

  public async handleCloseLabControllerEditModal(getDetails: boolean): Promise<void> {
    if (getDetails) {
      await this.getLabControllerDetails();
    }

    this.openEditControllerConfig = false
  }

  public handleSkip(): void {
    this.selectedMigrationIndex += 1;
  }

  public handleStart(): void {
    this.isOpenVsConfigEditorModal = true;
  }

  public handleLabControllerCardEdit(): void {
    this.openEditControllerConfig = true;
  }

  public async getMigrationOverviewData(): Promise<void> {
    const migrationOverviewData$ = this.configurationTabService.getMigrationOverviewData();
    this.migrationOverviewData = await lastValueFrom(migrationOverviewData$);
  }

  public async handleLabControllerCardFetch(): Promise<void> {
    const fetchFromController$ = this.configurationTabService.fetchFromController();
    const allVSMigrationsData: incompleteVsMigrationsData = await lastValueFrom(fetchFromController$);

    // this.incompleteMigrationsData = allVSMigrationsData.incompleteVSMigrationsData;
    // this.completedVSMigrationsCount = allVSMigrationsData.completedVSMigrationsCount;
    this.configurationTabService.showCompletedMigrationsCountAlert = true;
  }

  private async getAllIncompleteVSMigrationsData(): Promise<void> {
    const data$ = this.configurationTabService.getAllIncompleteVSMigrationsData();
    const data: incompleteVsMigrationsData = await lastValueFrom(data$);

    this.incompleteVSMigrationsData = data.incompleteVSMigrationsData;
    this.completedVSMigrationsCount = data.completedVSMigrationsCount;
  }

  public onAlertClose(): void {
    this.configurationTabService.showCompletedMigrationsCountAlert = false;
  }

  private async getLabControllerDetails(): Promise<void> {
    const labControllerDetails$ = this.configurationTabService.getLabControllerDetails();
    this.labControllerDetails = await lastValueFrom(labControllerDetails$);
  }
}
