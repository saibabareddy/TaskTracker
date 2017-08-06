package com.tasktracker;


import com.fasterxml.jackson.databind.ObjectMapper;
import org.glassfish.jersey.server.ResourceConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.ws.rs.ApplicationPath;
import javax.ws.rs.ext.ContextResolver;
import javax.ws.rs.ext.Provider;

@Component
@ApplicationPath("/tasktracker")
public class JerseyConfig extends ResourceConfig {

 @Autowired
 public JerseyConfig(ObjectMapper objectMapper) {
   // register endpoints
   packages("com.tasktracker");
   // register jackson for json 
   register(new ObjectMapperContextResolver(objectMapper));
 }

 @Provider
 public static class ObjectMapperContextResolver implements ContextResolver<ObjectMapper> {

   private final ObjectMapper mapper;

   public ObjectMapperContextResolver(ObjectMapper mapper) {
     this.mapper = mapper;
   }

   @Override
   public ObjectMapper getContext(Class<?> type) {
     return mapper;
   }
 }
}