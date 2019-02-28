/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <React/RCTLinkingManager.h>

@implementation AppDelegate
- (void)applicationDidEnterBackground:(UIApplication *)application;
{


}

//func application(_ application: UIApplication, open url: URL, sourceApplication: String?, annotation: Any) -> Bool
//{
//  let scheme = url.scheme
//
//  if scheme != nil && (scheme == "lifesharecare" || scheme == "orahstaging")
//  {
//    let params = url.queryParams()
//
//
//  }
//
//  return true
//}
//




//- (void)applicationWillEnterForeground:(UIApplication *)application
//{
//
//
//  UIWindow* topWindow = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
//  topWindow.rootViewController = [UIViewController new];
//  topWindow.windowLevel = UIWindowLevelAlert + 1;
//
//  UIAlertController* alert = [UIAlertController alertControllerWithTitle:@"After auth response" message:[NSString stringWithFormat:@"%s","dict"] preferredStyle:UIAlertControllerStyleAlert];
//
//  [alert addAction:[UIAlertAction actionWithTitle:NSLocalizedString(@"OK",@"confirm") style:UIAlertActionStyleCancel handler:^(UIAlertAction * _Nonnull action) {
//    // continue your work
//
//    // important to hide the window after work completed.
//    // this also keeps a reference to the window until the action is invoked.
//    topWindow.hidden = YES; // if you want to hide the topwindow then use this
//
//  }]];
//
//  [topWindow makeKeyAndVisible];
//  [topWindow.rootViewController presentViewController:alert animated:YES completion:nil];
//  //NSLog(@" %hhd", success);
//}




- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url
  sourceApplication:(NSString *)sourceApplication annotation:(id)annotation
{
  return [RCTLinkingManager application:application openURL:url
                      sourceApplication:sourceApplication annotation:annotation];
}

// Only if your app is using [Universal Links](https://developer.apple.com/library/prerelease/ios/documentation/General/Conceptual/AppSearch/UniversalLinks.html).
- (BOOL)application:(UIApplication *)application continueUserActivity:(NSUserActivity *)userActivity
 restorationHandler:(void (^)(NSArray * _Nullable))restorationHandler
{
  return [RCTLinkingManager application:application
                   continueUserActivity:userActivity
                     restorationHandler:restorationHandler];
}


- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  NSURL *jsCodeLocation;

  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];

  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"IQForm"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  return YES;
}

@end
