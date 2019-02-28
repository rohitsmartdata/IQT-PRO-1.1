
#import "CalendarManager.h"
#import <React/RCTLog.h>

@implementation CalendarManager 
@synthesize itemValue;


//- (BOOL)application:(UIApplication* )app openURL:(NSURL* )url options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options{
//  //NSDictionary *sendingAppId = options[@"sourceApplication"];
//
//
//
//  return true;
//}

// To export a module named CalendarManager
RCT_EXPORT_MODULE();

// This would name the module AwesomeCalendarManager instead
// RCT_EXPORT_MODULE(AwesomeCalendarManager);
RCT_EXPORT_METHOD(addEvent:(NSString *)name location:(NSString *)location)
{
  RCTLogInfo(@"Pretending to create an event %@ at %@", name, location);
  
}





//RCT_REMAP_METHOD(getThing, resolver: (RCTPromiseResolveBlock)resolve
//                 rejecter:(RCTPromiseRejectBlock)reject)
//{
//
//    NSString *thingToReturn = itemValue;
//    resolve(thingToReturn);
//
//}
//
//RCT_EXPORT_METHOD(getData: (RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
//  NSMutableDictionary* obj= [[NSMutableDictionary alloc]init];
//  [obj setObject:@"ravikumar" forKey:@"name"];
//  [obj setObject:@"13" forKey:@"dob"];
//
//  resolve(obj);
//}


//func application(_ application: UIApplication, open url: URL, sourceApplication: String?, annotation: Any) -> Bool
//{
//  let scheme = url.scheme
//
//  if scheme != nil && (scheme == "lifesharecare" || scheme == "orahstaging")
//  {
//    let params = url.queryParams()
//
//  }
//  return true
//}
RCT_EXPORT_METHOD(checkBankRoll:(NSString *)url resolver: (RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
  NSLog(@"Reached completion handelar %@", url);
  NSURL *URL = [NSURL URLWithString:url];

  NSDictionary *dict = [[NSDictionary alloc] init];
  dispatch_async(dispatch_get_main_queue(), ^{
    [[UIApplication sharedApplication] openURL:URL options:dict completionHandler:^(BOOL success) {
      NSLog(@"response after auth  %d", success);
      NSLog(@"response dict  %@", dict);
      
      NSURLComponents *comp = [NSURLComponents componentsWithURL:URL resolvingAgainstBaseURL:YES];
      //comp.queryItems
      if (comp.queryItems != nil){
        for (int i = 0; i < comp.queryItems.count; i++){
          if ([[NSString stringWithFormat:@"%@", (comp.queryItems[i].name)] isEqualToString: @"orderRef"]){
            itemValue = [NSString stringWithFormat:@"%@",(comp.queryItems[i].value)];
          }
        }
      }
      resolve(itemValue);
    }];
  });
 
}





@end

