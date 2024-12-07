import { NavigatedData, Page } from '@nativescript/core';
import { ScoreViewModel } from './score-view-model';

export function onNavigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    page.bindingContext = new ScoreViewModel();
}