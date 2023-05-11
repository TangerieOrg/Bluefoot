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

#define EM_PROPERTY(Name, Prefix) property(#Name, &Prefix::get_##Name,  &Prefix::set_##Name)
#define EM_PROPERTY_GET(Name, Prefix) property(#Name, &Prefix::get_##Name)

#define EM_REGISTER_VECTOR(T) register_vector<T>("vector<" #T ">")
#define EM_REGISTER_MAP(K, V) register_map<K, V>("map<" #K ", " #V ">")

#define EM_OBJECT(T) value_object<T>("Noodle"#T)
#define EM_CLASS(T) class_<T>("Noodle"#T)