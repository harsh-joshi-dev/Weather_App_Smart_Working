cmake_minimum_required(VERSION 3.10)
project(AwesomeProject)

add_library(
    mylibrary
    SHARED
    src/main/cpp/native-lib.cpp
)

find_library(
    log-lib
    log
)

target_link_libraries(
    mylibrary
    ${log-lib}
)
