//
//  batStat.m
//  IQForm
//
//  Created by Rohit Saini on 22/01/19.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "batStat.h"

@implementation batStat

RCT_EXPORT_MODULE(BatteryStatus)

- (instancetype)init
{
  if ((self = [super init])) {
    
    [[UIDevice currentDevice] setBatteryMonitoringEnabled:YES];
    
  }
  return self;
}

RCT_EXPORT_METHOD(hide) {
}

RCT_EXPORT_METHOD(updateBatteryLevel:(RCTResponseSenderBlock)callback)
{
  callback(@[[self getBatteryStatus]]);
}


RCT_EXPORT_METHOD(test:(RCTResponseSenderBlock)callback)
{
  callback(@[[self test1]]);
}
//manually get battery status by calling following method


-(NSDictionary*)test1
{
  
  UIDevice *myDevice = [UIDevice currentDevice];
  [myDevice setBatteryMonitoringEnabled:YES];
  
  int state = [myDevice batteryState];
  NSDictionary *dictionary = @{@"state" : [NSNumber numberWithInt:state]};
//  NSDictionary *dictionary = @{@"state" : state};
  return dictionary;
}


-(NSDictionary*)getBatteryStatus
{
  
  float batteryLevel = [UIDevice currentDevice].batteryLevel;
  
  NSObject* currentLevel = nil;
  
  currentLevel = [NSNumber numberWithFloat:(batteryLevel * 100)];
  
  NSMutableDictionary* batteryData = [NSMutableDictionary dictionaryWithCapacity:2];
  
  [batteryData setObject:currentLevel forKey:@"level"];
  return batteryData;
  
}

@end

