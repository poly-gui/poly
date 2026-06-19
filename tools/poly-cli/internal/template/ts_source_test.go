package template

import (
	"os"
	"path/filepath"
	"strings"
	"testing"

	"poly-cli/internal/poly"
)

func TestPackageJSONUsesPublishedCorePackageByDefault(t *testing.T) {
	dir := t.TempDir()

	err := GenerateTemplates([]templateFile{PackageJSON}, dir, poly.ProjectDescription{
		AppName: "Test App",
	})
	if err != nil {
		t.Fatal(err)
	}

	content := readGeneratedPackageJSON(t, dir)
	if !strings.Contains(content, `"@poly-gui/core": "0.1.0"`) {
		t.Fatalf("expected published @poly-gui/core dependency, got:\n%s", content)
	}
	if strings.Contains(content, "ts-poly") {
		t.Fatalf("expected no old ts-poly dependency source, got:\n%s", content)
	}
}

func TestPackageJSONUsesLocalCorePackageInDebugMode(t *testing.T) {
	dir := t.TempDir()
	workspacePath := filepath.Join(t.TempDir(), "poly")

	err := GenerateTemplates([]templateFile{PackageJSON}, dir, poly.ProjectDescription{
		AppName:            "Test App",
		DebugWorkspacePath: workspacePath,
	})
	if err != nil {
		t.Fatal(err)
	}

	content := readGeneratedPackageJSON(t, dir)
	expected := `"@poly-gui/core": "file:` + workspacePath + `/sdks/typescript/core"`
	if !strings.Contains(content, expected) {
		t.Fatalf("expected local @poly-gui/core dependency %q, got:\n%s", expected, content)
	}
}

func readGeneratedPackageJSON(t *testing.T, dir string) string {
	t.Helper()

	content, err := os.ReadFile(filepath.Join(dir, "package.json"))
	if err != nil {
		t.Fatal(err)
	}
	return string(content)
}
