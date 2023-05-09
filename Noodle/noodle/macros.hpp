#pragma once

#define GETTER(T, N)                \
  T get_##N() const { return N; };

#define SETTER(T, N)                \
  void set_##N(T x) { N = x; }

#define GETSET(T, N)                \
  GETTER(T, N)  \
  SETTER(T, N)

#define GETSETPROP(T, N) \
    T N; \
    GETSET(T, N)

#define EMPROPERTY(Name, Prefix) property(#Name, &Prefix::get_##Name,  &Prefix::set_##Name)
#define EMPROPERTY_GET(Name, Prefix) property(#Name, &Prefix::get_##Name)