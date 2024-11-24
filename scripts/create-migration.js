const { exec } = require("child_process");

// Get the migration name from command-line arguments
const migrationName = process.argv[2];
if (!migrationName) {
    console.error("Please provide a migration name.");
    process.exit(1);
}

const command = `yarn typeorm migration:generate src/Infrastructure/database/data-source/migrations/${migrationName}`;
// Execute the command
exec(command, (err, stdout) => {
    if (err) {
        console.error(`Error: ${err.message}`);
        return;
    }
    console.log(stdout);
});
