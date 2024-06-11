import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileComponent } from './user-profile.component';
import { By } from '@angular/platform-browser';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserProfileComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;

    // Mock userProfile data
    component.userProfile = {
      avatar_url: 'test',
      name: 'Tripthi',
      bio: 'Software Developer',
      location: 'India',
      html_url: 'http://abc.com/test',
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display user profile information', () => {
    const compiled = fixture.debugElement.nativeElement;

    const profilePic = compiled.querySelector('.profile-pic');
    expect(profilePic.src).toContain(component.userProfile.avatar_url);
    expect(profilePic.alt).toBe(component.userProfile.name);

    const nameElement = compiled.querySelector('h2');
    expect(nameElement.textContent).toContain(component.userProfile.name);

    const bioElement = compiled.querySelector('.bio');
    expect(bioElement.textContent).toContain(component.userProfile.bio);

    const locationElement = compiled.querySelector('p:nth-child(3)');
    expect(locationElement.textContent).toContain(
      component.userProfile.location
    );

    const linkElement = compiled.querySelector('a');
    expect(linkElement.href).toBe(component.userProfile.html_url);
  });

  it('should not display GitHub profile link if userProfile is null', () => {
    component.userProfile = null;
    fixture.detectChanges();

    const linkElement = fixture.debugElement.query(By.css('a'));
    expect(linkElement).toBeNull();
  });
});
