package template

import (
	"os"
	"path/filepath"
	"strings"
	"testing"

	"poly-cli/internal/poly"
)

func TestXcodeGenSpecUsesPublishedPolyNativePackageByDefault(t *testing.T) {
	dir := t.TempDir()

	err := GenerateTemplates([]templateFile{XcodeGenSpec}, dir, poly.ProjectDescription{
		AppName:     "TestApp",
		PackageName: "org.test",
	})
	if err != nil {
		t.Fatal(err)
	}

	content := readGeneratedProjectYML(t, dir)
	if !strings.Contains(content, "url: https://github.com/poly-gui/swift-poly-native") {
		t.Fatalf("expected published PolyNative package URL, got:\n%s", content)
	}
	if strings.Contains(content, "runtimes/swift") {
		t.Fatalf("expected no local Swift runtime path, got:\n%s", content)
	}
}

func TestXcodeGenSpecUsesLocalSwiftRuntimeInDebugMode(t *testing.T) {
	dir := t.TempDir()
	workspacePath := filepath.Join(t.TempDir(), "poly")

	err := GenerateTemplates([]templateFile{XcodeGenSpec}, dir, poly.ProjectDescription{
		AppName:            "TestApp",
		PackageName:        "org.test",
		DebugWorkspacePath: workspacePath,
	})
	if err != nil {
		t.Fatal(err)
	}

	content := readGeneratedProjectYML(t, dir)
	expected := "path: " + workspacePath + "/runtimes/swift"
	if !strings.Contains(content, expected) {
		t.Fatalf("expected local Swift runtime path %q, got:\n%s", expected, content)
	}
	if strings.Contains(content, "PolyNativeSwift") {
		t.Fatalf("expected no old PolyNativeSwift path, got:\n%s", content)
	}
}

func readGeneratedProjectYML(t *testing.T, dir string) string {
	t.Helper()

	content, err := os.ReadFile(filepath.Join(dir, "project.yml"))
	if err != nil {
		t.Fatal(err)
	}
	return string(content)
}
