//
//  CalendarManager.h
//  shyft
//
//  Created by Saurabh Chauhan on 20/09/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

// CalendarManager.h
#import <React/RCTBridgeModule.h>

@interface CalendarManager : NSObject <RCTBridgeModule>
@property (strong, nonatomic) NSString *itemValue;
@end
