cmake_minimum_required(VERSION 3.27)

project(gtkpoly LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_EXPORT_COMPILE_COMMANDS ON)

# setup gtkmm
find_package(PkgConfig)
pkg_check_modules(GTKMM gtkmm-4.0)
link_directories(${GTKMM_LIBRARY_DIRS})
include_directories(${GTKMM_INCLUDE_DIRS})

find_package(nanopack REQUIRED)

add_library(gtkpoly STATIC
        src/application.cxx
        src/rpc/event/click_event.np.cxx
        src/rpc/nanopack_message_factory.np.cxx
        src/rpc/native_layer_service.np.cxx
        src/rpc/portable_layer_service.np.cxx
        src/rpc/widget/button.np.cxx
        src/rpc/widget/center.np.cxx
        src/rpc/widget/column.np.cxx
        src/rpc/widget/font_style.np.cxx
        src/rpc/widget/list_view.np.cxx
        src/rpc/widget/list_view_batch_operations.np.cxx
        src/rpc/widget/list_view_delete_operation.np.cxx
        src/rpc/widget/list_view_insert_operation.np.cxx
        src/rpc/widget/list_view_item.np.cxx
        src/rpc/widget/list_view_item_config.np.cxx
        src/rpc/widget/list_view_operation.np.cxx
        src/rpc/widget/make_list_view_operation.np.cxx
        src/rpc/widget/make_widget.np.cxx
        src/rpc/widget/row.np.cxx
        src/rpc/widget/slider.np.cxx
        src/rpc/widget/slider_value_changed_event.np.cxx
        src/rpc/widget/text.np.cxx
        src/rpc/widget/text_field.np.cxx
        src/rpc/widget/text_field_changed_event.np.cxx
        src/rpc/widget/widget.np.cxx
        src/window/window_manager.cxx
        src/widget/widget_factory.cxx
        src/widget/text.cxx
        src/widget/column.cxx
        src/widget/center.cxx
        src/widget/button.cxx
        src/widget/widget_registry.cxx
        src/widget/widget_updater.cxx
        src/widget/text_field.cxx
        src/widget/row.cxx
        src/widget/spacer.cxx
        src/widget/list_view.cxx
)
target_link_libraries(gtkpoly nanopack)
target_compile_definitions(gtkpoly PUBLIC "$<$<CONFIG:DEBUG>:DEBUG>")
target_include_directories(gtkpoly
        PUBLIC ${CMAKE_CURRENT_SOURCE_DIR}/include
        PRIVATE ${CMAKE_CURRENT_SOURCE_DIR}/src)

install(TARGETS gtkpoly
	DESTINATION ${CMAKE_INSTALL_PREFIX})
