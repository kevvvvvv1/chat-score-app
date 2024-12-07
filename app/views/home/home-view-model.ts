import { Observable, Frame } from '@nativescript/core';
import { Routes } from '~/shared/navigation/routes';

export class HomeViewModel extends Observable {
    constructor() {
        super();
    }

    onStartChatting() {
        Frame.topmost().navigate({
            moduleName: Routes.chat,
            animated: true
        });
    }

    onTestScore() {
        Frame.topmost().navigate({
            moduleName: Routes.score,
            animated: true
        });
    }

    onProfileTap() {
        Frame.topmost().navigate({
            moduleName: Routes.profile,
            animated: true
        });
    }
}