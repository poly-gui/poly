import Foundation
import PackagePlugin

@main
struct TwxBuilderPlugin: BuildToolPlugin {
    func `where`(cmd: String) -> Path? {
        print("where is \(cmd)?")
        
        let task = Process()
        let pipe = Pipe()
        
        task.standardOutput = pipe
        task.executableURL = URL(filePath: "/usr/bin/which", relativeTo: nil)
        task.standardInput = nil
        task.standardError = pipe
        task.arguments = [cmd]
        
        do {
            try task.run()
            task.waitUntilExit()
            
            guard let data = try pipe.fileHandleForReading.readToEnd() else {
                return nil
            }
            
            let output = String(data: data, encoding: .utf8)!
            print("output: \(output)")
            
            return Path(output)
        } catch let err {
            print("error when running which: \(err)")
            return nil
        }
    }
    
    func createBuildCommands(context: PluginContext, target: any Target) async throws -> [Command] {
        let twxSourceDir = context.package.directory.appending(["..", "..", "Sources", "twx"])
        let outputDir = context.pluginWorkDirectory.appending("build")
        guard let cmake = self.where(cmd: "cmake")
        else {
            return []
        }
        try FileManager.default.createDirectory(atPath: outputDir.string, withIntermediateDirectories: true)
        return [
            .prebuildCommand(
                displayName: "Configuring twx with cmake",
                executable: cmake,
                arguments: ["-B", outputDir, "-DBUILD_TESTING=false"],
                outputFilesDirectory: outputDir
            ),
            .prebuildCommand(
                displayName: "Building twx with cmake",
                executable: cmake,
                arguments: ["--build", "."],
                outputFilesDirectory: outputDir
            ),
            .prebuildCommand(
                displayName: "Generating twx.xcframework",
                executable: Path("/usr/bin/xcodebuild"),
                arguments: ["-create-xcframework", "-library", outputDir.appending(["libtwx.a"]), "-headers", twxSourceDir.appending("..", "include"), "-output", outputDir.appending(["twx.xcframework"])],
                outputFilesDirectory: outputDir
            )
        ]
    }
}
