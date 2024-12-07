import { Observable } from '@nativescript/core';

export class ProfileIconModel extends Observable {
    onProfileTap() {
        // Navigation vers le profil
        console.log('Navigate to profile');
    }
}