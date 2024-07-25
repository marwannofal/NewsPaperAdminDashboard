using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NewsPaper.Migrations
{
    /// <inheritdoc />
    public partial class FK_For_the_editon : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Articles_Editions_EditionId",
                table: "Articles");

            migrationBuilder.DropIndex(
                name: "IX_Articles_EditionId",
                table: "Articles");

            migrationBuilder.DropColumn(
                name: "EditionId",
                table: "Articles");

            migrationBuilder.CreateIndex(
                name: "IX_Articles_VersionId",
                table: "Articles",
                column: "VersionId");

            migrationBuilder.AddForeignKey(
                name: "FK_Articles_Editions_VersionId",
                table: "Articles",
                column: "VersionId",
                principalTable: "Editions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Articles_Editions_VersionId",
                table: "Articles");

            migrationBuilder.DropIndex(
                name: "IX_Articles_VersionId",
                table: "Articles");

            migrationBuilder.AddColumn<Guid>(
                name: "EditionId",
                table: "Articles",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Articles_EditionId",
                table: "Articles",
                column: "EditionId");

            migrationBuilder.AddForeignKey(
                name: "FK_Articles_Editions_EditionId",
                table: "Articles",
                column: "EditionId",
                principalTable: "Editions",
                principalColumn: "Id");
        }
    }
}
