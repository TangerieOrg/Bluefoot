#pragma once
#include <emscripten/emscripten.h>
#include <emscripten/bind.h>

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

#define EM_PROPERTY(Name, Prefix) property(#Name, &Prefix::get_##Name,  &Prefix::set_##Name)
#define EM_PROPERTY_GET(Name, Prefix) property(#Name, &Prefix::get_##Name)

#define EM_REGISTER_VECTOR(T) emscripten::register_vector<T>("vector<" #T ">")
#define EM_REGISTER_MAP(K, V) emscripten::register_map<K, V>("map<" #K ", " #V ">")

#define EM_OBJECT(T) emscripten::value_object<T>("Noodle"#T)
#define EM_CLASS(T) emscripten::class_<T>("Noodle"#T)