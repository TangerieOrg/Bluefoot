#pragma once

#define SINGLETON_FUNCTIONS(name) \
    name() {}; \
    ~name() {};

template <typename T>
class Singleton {
public:
    inline static T &getInstance() {
        static T instance;
        return instance;
    }

protected:
    Singleton() {}
    ~Singleton() {}

public:
    Singleton(Singleton const &) = delete;
    Singleton &operator=(Singleton const &) = delete;
};