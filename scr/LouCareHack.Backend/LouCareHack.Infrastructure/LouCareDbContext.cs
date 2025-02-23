using LouCareHack.Domain.Entities;
using LouCareHack.Domain.SeedWork;
using Microsoft.EntityFrameworkCore;

namespace LouCareHack.Infrastructure;

public class LouCareDbContext : DbContext
{
    public LouCareDbContext(DbContextOptions<LouCareDbContext> options) : base(options)
    {
        ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
    }

    public virtual DbSet<Applicant> Applicants { get; set; }

    public virtual DbSet<Case> Cases { get; set; }

    public virtual DbSet<CaseAssignment> CaseAssignments { get; set; }

    public virtual DbSet<CaseManager> CaseManagers { get; set; }

    public virtual DbSet<CaseStatus> CaseStatuses { get; set; }

    public virtual DbSet<Contact> Contacts { get; set; }

    public virtual DbSet<HealthCondition> HealthConditions { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<Unit> Units { get; set; }

    public virtual DbSet<UnitStatus> UnitStatuses { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .HasPostgresExtension("fuzzystrmatch")
            .HasPostgresExtension("hstore")
            .HasPostgresExtension("pg_trgm")
            .HasPostgresExtension("pgcrypto")
            .HasPostgresExtension("pgrouting")
            .HasPostgresExtension("postgis")
            .HasPostgresExtension("tiger", "postgis_tiger_geocoder")
            .HasPostgresExtension("topology", "postgis_topology");

        modelBuilder.Entity<Applicant>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("pk_applicant_id");

            entity.ToTable("Applicant", "housing_support");

            entity.Property(e => e.UserId)
                .ValueGeneratedNever()
                .HasColumnName("User_Id");
            entity.Property(e => e.ConditionId).HasColumnName("Condition_Id");
            entity.Property(e => e.ContactId).HasColumnName("Contact_Id");
            entity.Property(e => e.Email).HasMaxLength(100);
            entity.Property(e => e.FirstName)
                .HasMaxLength(100)
                .HasColumnName("First_name");
            entity.Property(e => e.Gender)
                .HasMaxLength(2)
                .IsFixedLength();
            entity.Property(e => e.LastName)
                .HasMaxLength(100)
                .HasColumnName("Last_name");
            entity.Property(e => e.PhoneNumber)
                .HasMaxLength(15)
                .HasColumnName("Phone_number");

            entity.HasOne(d => d.Condition).WithMany(p => p.Applicants)
                .HasForeignKey(d => d.ConditionId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_applicant_conditionid");

            entity.HasOne(d => d.Contact).WithMany(p => p.Applicants)
                .HasForeignKey(d => d.ContactId)
                .HasConstraintName("fk_applicant_contactid");

            entity.HasOne(d => d.User).WithOne(p => p.Applicant)
                .HasForeignKey<Applicant>(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_applicant_userid");
        });

        modelBuilder.Entity<Case>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("pk_case_id");

            entity.ToTable("Case", "housing_support");

            entity.Property(e => e.Id).HasDefaultValueSql("gen_random_uuid()");
            entity.Property(e => e.CaseDate).HasColumnName("Case_date");
            entity.Property(e => e.CaseManagerId).HasColumnName("Case_Manager_Id");
            entity.Property(e => e.CaseNumber).HasColumnName("Case_number");
            entity.Property(e => e.CaseStatusId).HasColumnName("Case_Status_Id");
            entity.Property(e => e.UserId).HasColumnName("User_Id");

            entity.HasOne(d => d.CaseManager).WithMany(p => p.Cases)
                .HasForeignKey(d => d.CaseManagerId)
                .HasConstraintName("fk_case_casemngid");

            entity.HasOne(d => d.CaseStatus).WithMany(p => p.Cases)
                .HasForeignKey(d => d.CaseStatusId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_case_statusid");

            entity.HasOne(d => d.User).WithMany(p => p.Cases)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_case_userid");
        });

        modelBuilder.Entity<CaseAssignment>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("pk_case_assignment_id");

            entity.ToTable("Case_Assignment", "housing_support");

            entity.Property(e => e.Id).HasDefaultValueSql("gen_random_uuid()");
            entity.Property(e => e.CaseId).HasColumnName("Case_Id");
            entity.Property(e => e.UnitId).HasColumnName("Unit_Id");

            entity.HasOne(d => d.Case).WithMany(p => p.CaseAssignments)
                .HasForeignKey(d => d.CaseId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_caseassignments_caseid");

            entity.HasOne(d => d.Unit).WithMany(p => p.CaseAssignments)
                .HasForeignKey(d => d.UnitId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_caseassignments_unitid");
        });

        modelBuilder.Entity<CaseManager>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("pk_case_manager_id");

            entity.ToTable("Case_Manager", "housing_support");

            entity.Property(e => e.UserId)
                .ValueGeneratedNever()
                .HasColumnName("User_Id");
            entity.Property(e => e.Email).HasMaxLength(100);
            entity.Property(e => e.FirstName)
                .HasMaxLength(100)
                .HasColumnName("First_Name");
            entity.Property(e => e.LastName)
                .HasMaxLength(100)
                .HasColumnName("Last_Name");
            entity.Property(e => e.PhoneNumber)
                .HasMaxLength(15)
                .HasColumnName("Phone_Number");

            entity.HasOne(d => d.User).WithOne(p => p.CaseManager)
                .HasForeignKey<CaseManager>(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_casemngr_userid");
        });

        modelBuilder.Entity<CaseStatus>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("pk_case_status_id");

            entity.ToTable("Case_Status", "housing_support");

            entity.Property(e => e.Id).HasDefaultValueSql("gen_random_uuid()");
            entity.Property(e => e.Name).HasMaxLength(100);
        });

        modelBuilder.Entity<Contact>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("pk_contact_id");

            entity.ToTable("Contact", "housing_support");

            entity.Property(e => e.UserId)
                .ValueGeneratedNever()
                .HasColumnName("User_Id");
            entity.Property(e => e.Email).HasMaxLength(100);
            entity.Property(e => e.Name).HasMaxLength(150);
            entity.Property(e => e.PhoneNumber)
                .HasMaxLength(15)
                .HasColumnName("Phone_Number");
            entity.Property(e => e.Type).HasMaxLength(100);

            entity.HasOne(d => d.User).WithOne(p => p.Contact)
                .HasForeignKey<Contact>(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_contact_userid");
        });

        modelBuilder.Entity<HealthCondition>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("pk_health_conditions_id");

            entity.ToTable("Health_Conditions", "housing_support");

            entity.Property(e => e.Id).HasDefaultValueSql("gen_random_uuid()");
            entity.Property(e => e.Name).HasMaxLength(100);
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("pk_role_id");

            entity.ToTable("Role", "housing_support");

            entity.Property(e => e.Id).HasDefaultValueSql("gen_random_uuid()");
            entity.Property(e => e.Name).HasMaxLength(150);
        });

        modelBuilder.Entity<Unit>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("pk_unit_id");

            entity.ToTable("Unit", "housing_support");

            entity.Property(e => e.Id).HasDefaultValueSql("gen_random_uuid()");
            entity.Property(e => e.City).HasMaxLength(100);
            entity.Property(e => e.State).HasMaxLength(100);
            entity.Property(e => e.Type)
                .HasMaxLength(3)
                .IsFixedLength();
            entity.Property(e => e.UnitStatusId).HasColumnName("Unit_Status_Id");
            entity.Property(e => e.Zip).HasMaxLength(10);

            entity.HasOne(d => d.UnitStatus).WithMany(p => p.Units)
                .HasForeignKey(d => d.UnitStatusId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_unit_unitstatusid");
        });

        modelBuilder.Entity<UnitStatus>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("pk_unit_status_id");

            entity.ToTable("Unit_Status", "housing_support");

            entity.Property(e => e.Id).HasDefaultValueSql("gen_random_uuid()");
            entity.Property(e => e.Name).HasMaxLength(100);
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("pk_user_id");

            entity.ToTable("User", "housing_support");

            entity.Property(e => e.Id).HasDefaultValueSql("gen_random_uuid()");
            entity.Property(e => e.PasswordHash).HasMaxLength(150);
            entity.Property(e => e.Salt).HasMaxLength(150);

            entity.HasOne(d => d.Role).WithMany(p => p.Users)
                .HasForeignKey(d => d.RoleId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_user_roleid");
        });

        //OnModelCreatingPartial(modelBuilder);
    }

    public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = new CancellationToken())
    {
        foreach (var entry in ChangeTracker.Entries<BaseEntity>())
        {
            switch (entry.State)
            {
                case EntityState.Added:
                    entry.Entity.CreateAt = DateTime.UtcNow;
                    break;
                case EntityState.Modified:
                    break;
                default:
                    break;
            }
        }

        return base.SaveChangesAsync(cancellationToken);
    }


}
